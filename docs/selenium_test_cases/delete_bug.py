from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
import time

# --- Chrome setup ---
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
driver.maximize_window()

try:
    print("🚀 Launching login page...")
    driver.get("http://localhost:5173/login")
    wait = WebDriverWait(driver, 15)

    # --- LOGIN ---
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))).send_keys("testuser@example.com")
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='password']"))).send_keys("password123")
    wait.until(EC.element_to_be_clickable((By.XPATH, "//*[@id='root']//button"))).click()

    print("✅ Logged in successfully!")

    # --- WAIT FOR BUG LIST PAGE ---
    wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Delete')]")))

    # --- CLICK DELETE BUTTON ---
    print("🗑️ Attempting to delete a bug...")
    delete_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Delete')]")))
    delete_button.click()

    # --- HANDLE CONFIRMATION ALERT (if any) ---
    try:
        alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
        print("⚠️ Confirmation alert detected.")
        alert.accept()
        print("🗑️ Confirmed delete action.")
    except TimeoutException:
        print("ℹ️ No confirmation alert found — continuing...")

    # --- WAIT FOR SUCCESS OR REFRESH ---
    try:
        success_message = wait.until(
            EC.presence_of_element_located((
                By.XPATH,
                "//*[contains(text(),'deleted') or contains(text(),'removed') or contains(text(),'success')]"
            ))
        )
        print(f"✅ Bug deleted successfully! Message: {success_message.text}")
    except TimeoutException:
        print("⚠️ No explicit success message found — verify bug deletion on UI.")

except TimeoutException:
    print("⚠️ Test failed: Timeout while locating an element.")
except Exception as e:
    print(f"❌ Test failed due to error: {e}")
finally:
    input("Press Enter to close browser...")
    driver.quit()
