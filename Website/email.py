import os
import json
import gspread
from google.oauth2.service_account import Credentials

# Load the credentials from a JSON file
credentials = Credentials.from_service_account_file('credentials.json')

# Create a connection to the Google Sheets API
client = gspread.authorize(credentials)

# Open the Google Spreadsheet
spreadsheet = client.open('Emails')

# Store emails in first worksheet
worksheet = spreadsheet.get_worksheet(0)

def store_email(email):
    # Append the email to the last row of the worksheet
    worksheet.append_row([email])
    print(f"Email {email} stored successfully!")

# Example usage
user_email = input("Enter your email: ")
store_email(user_email)
