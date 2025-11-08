from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

# --- Chrome setup ---
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)  # Keep browser open

# ✅ Automatically download and use correct ChromeDriver version
service = Service(ChromeDriverManager().install())

driver = webdriver.Chrome(service=service, options=chrome_options)

# --- Open your app ---
driver.get("http://localhost:5173/register")
driver.maximize_window()

time.sleep(2)

# --- Fill the form ---
full_name = driver.find_element(By.XPATH, "//input[@placeholder='Full Name']")
email = driver.find_element(By.XPATH, "//input[@placeholder='Email Address']")
password = driver.find_element(By.XPATH, "//input[@placeholder='Create Password']")
role = driver.find_element(By.TAG_NAME, "select")
register_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Register')]")

# --- Enter values ---
full_name.send_keys("Test User")
email.send_keys("testuser@example.com")
password.send_keys("password123")
role.send_keys("QA")

time.sleep(1)

# --- Click register ---
register_btn.click()

# --- Optional: wait to see result ---
time.sleep(3)

print("✅ Registration test completed successfully!")

driver.quit()
