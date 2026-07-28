#!/usr/bin/env python3
"""
Backend API Test Suite for The Dark Matter VFX Studio
Tests all API endpoints with valid and invalid payloads
"""

import requests
import json
import sys
from datetime import datetime

# Read base URL from .env
BASE_URL = "https://d9ff7c0c-8a55-48be-acc1-f909e6063ffe.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(passed, message):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")
    return passed

def test_health_check():
    """Test GET /api and GET /api/health endpoints"""
    print_test_header("Health Check Endpoints")
    all_passed = True
    
    # Test GET /api
    try:
        print("\n1. Testing GET /api")
        response = requests.get(BASE_URL, timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            checks = [
                ('status' in data and data['status'] == 'ok', "Has status='ok'"),
                ('service' in data and data['service'] == 'The Dark Matter API', "Has correct service name"),
                ('time' in data, "Has time field with ISO timestamp"),
                ('Access-Control-Allow-Origin' in response.headers, "Has CORS header")
            ]
            for check, desc in checks:
                all_passed &= print_result(check, desc)
        else:
            all_passed &= print_result(False, f"Expected 200, got {response.status_code}")
    except Exception as e:
        all_passed &= print_result(False, f"Exception: {str(e)}")
    
    # Test GET /api/health
    try:
        print("\n2. Testing GET /api/health")
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            checks = [
                ('status' in data and data['status'] == 'ok', "Has status='ok'"),
                ('service' in data and data['service'] == 'The Dark Matter API', "Has correct service name"),
                ('time' in data, "Has time field")
            ]
            for check, desc in checks:
                all_passed &= print_result(check, desc)
        else:
            all_passed &= print_result(False, f"Expected 200, got {response.status_code}")
    except Exception as e:
        all_passed &= print_result(False, f"Exception: {str(e)}")
    
    return all_passed

def test_contact_endpoint():
    """Test POST /api/contact with valid and invalid payloads"""
    print_test_header("Contact Form Endpoint")
    all_passed = True
    contact_id = None
    
    # Test valid payload
    try:
        print("\n1. Testing POST /api/contact with VALID payload")
        valid_payload = {
            'name': 'Ravi Test',
            'email': 'ravi@test.com',
            'phone': '+91-999',
            'company': 'Aurora',
            'projectType': 'Feature Film',
            'budget': '$50k – $200k',
            'message': 'Need matchmove for 200 shots'
        }
        print(f"   Payload: {json.dumps(valid_payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/contact", json=valid_payload, timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            checks = [
                ('success' in data and data['success'] == True, "Has success=true"),
                ('id' in data, "Has id field (UUID)"),
                ('message' in data, "Has message field"),
                ('Access-Control-Allow-Origin' in response.headers, "Has CORS header")
            ]
            for check, desc in checks:
                all_passed &= print_result(check, desc)
            
            if 'id' in data:
                contact_id = data['id']
                print(f"   Contact ID: {contact_id}")
        else:
            all_passed &= print_result(False, f"Expected 200, got {response.status_code}")
    except Exception as e:
        all_passed &= print_result(False, f"Exception: {str(e)}")
    
    # Test invalid payload (missing required fields)
    try:
        print("\n2. Testing POST /api/contact with INVALID payload (missing message)")
        invalid_payload = {
            'name': 'x',
            'email': ''
        }
        print(f"   Payload: {json.dumps(invalid_payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/contact", json=invalid_payload, timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        checks = [
            (response.status_code == 400, "Returns 400 status code"),
            ('error' in response.json() if response.status_code == 400 else False, "Has error message")
        ]
        for check, desc in checks:
            all_passed &= print_result(check, desc)
    except Exception as e:
        all_passed &= print_result(False, f"Exception: {str(e)}")
    
    return all_passed, contact_id

def test_apply_endpoint():
    """Test POST /api/apply with valid and invalid payloads"""
    print_test_header("Job Application Endpoint")
    all_passed = True
    application_id = None
    
    # Test valid payload
    try:
        print("\n1. Testing POST /api/apply with VALID payload")
        valid_payload = {
            'name': 'Kabir Test',
            'email': 'kabir@test.com',
            'phone': '+91-888',
            'position': 'Matchmove Artist',
            'experience': '3 years',
            'portfolio': 'https://vimeo.com/x',
            'message': 'Excited to join'
        }
        print(f"   Payload: {json.dumps(valid_payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/apply", json=valid_payload, timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            checks = [
                ('success' in data and data['success'] == True, "Has success=true"),
                ('id' in data, "Has id field (UUID)"),
                ('message' in data, "Has message field"),
                ('Access-Control-Allow-Origin' in response.headers, "Has CORS header")
            ]
            for check, desc in checks:
                all_passed &= print_result(check, desc)
            
            if 'id' in data:
                application_id = data['id']
                print(f"   Application ID: {application_id}")
        else:
            all_passed &= print_result(False, f"Expected 200, got {response.status_code}")
    except Exception as e:
        all_passed &= print_result(False, f"Exception: {str(e)}")
    
    # Test invalid payload (missing position)
    try:
        print("\n2. Testing POST /api/apply with INVALID payload (missing position)")
        invalid_payload = {
            'name': 'x',
            'email': 'y@z.com'
        }
        print(f"   Payload: {json.dumps(invalid_payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/apply", json=invalid_payload, timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        checks = [
            (response.status_code == 400, "Returns 400 status code"),
            ('error' in response.json() if response.status_code == 400 else False, "Has error message")
        ]
        for check, desc in checks:
            all_passed &= print_result(check, desc)
    except Exception as e:
        all_passed &= print_result(False, f"Exception: {str(e)}")
    
    return all_passed, application_id

def test_list_endpoints(contact_id, application_id):
    """Test GET /api/contacts and GET /api/applications"""
    print_test_header("List Endpoints")
    all_passed = True
    
    # Test GET /api/contacts
    try:
        print("\n1. Testing GET /api/contacts")
        response = requests.get(f"{BASE_URL}/contacts", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response has {len(data.get('items', []))} contacts")
            
            checks = [
                ('items' in data, "Has items array"),
                (isinstance(data.get('items'), list), "items is a list"),
                ('Access-Control-Allow-Origin' in response.headers, "Has CORS header")
            ]
            for check, desc in checks:
                all_passed &= print_result(check, desc)
            
            # Check if our test contact is in the list
            if contact_id and 'items' in data:
                found = any(item.get('id') == contact_id for item in data['items'])
                all_passed &= print_result(found, f"Test contact (ID: {contact_id}) found in list")
                if found:
                    contact = next(item for item in data['items'] if item.get('id') == contact_id)
                    print(f"   Contact data: {json.dumps(contact, indent=2)}")
        else:
            all_passed &= print_result(False, f"Expected 200, got {response.status_code}")
    except Exception as e:
        all_passed &= print_result(False, f"Exception: {str(e)}")
    
    # Test GET /api/applications
    try:
        print("\n2. Testing GET /api/applications")
        response = requests.get(f"{BASE_URL}/applications", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response has {len(data.get('items', []))} applications")
            
            checks = [
                ('items' in data, "Has items array"),
                (isinstance(data.get('items'), list), "items is a list"),
                ('Access-Control-Allow-Origin' in response.headers, "Has CORS header")
            ]
            for check, desc in checks:
                all_passed &= print_result(check, desc)
            
            # Check if our test application is in the list
            if application_id and 'items' in data:
                found = any(item.get('id') == application_id for item in data['items'])
                all_passed &= print_result(found, f"Test application (ID: {application_id}) found in list")
                if found:
                    application = next(item for item in data['items'] if item.get('id') == application_id)
                    print(f"   Application data: {json.dumps(application, indent=2)}")
        else:
            all_passed &= print_result(False, f"Expected 200, got {response.status_code}")
    except Exception as e:
        all_passed &= print_result(False, f"Exception: {str(e)}")
    
    return all_passed

def main():
    print("\n" + "="*80)
    print("BACKEND API TEST SUITE - The Dark Matter VFX Studio")
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    print("="*80)
    
    results = {}
    
    # Run all tests
    results['health'] = test_health_check()
    results['contact'], contact_id = test_contact_endpoint()
    results['apply'], application_id = test_apply_endpoint()
    results['list'] = test_list_endpoints(contact_id, application_id)
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name.upper()}: {status}")
    
    all_passed = all(results.values())
    print("\n" + "="*80)
    if all_passed:
        print("🎉 ALL TESTS PASSED")
    else:
        print("⚠️  SOME TESTS FAILED")
    print("="*80 + "\n")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())
