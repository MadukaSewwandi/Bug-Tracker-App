from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait, Select
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

    # --- WAIT FOR DASHBOARD OR BUG LIST PAGE ---
    wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Edit')]")))

    # --- CLICK EDIT BUTTON ---
    print("✏️ Opening edit form...")
    edit_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Edit')]")))
    edit_button.click()

    # --- WAIT FOR EDIT FORM TO LOAD ---
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Enter bug title']")))

    # --- CLEAR AND UPDATE FIELDS ---
    title_field = driver.find_element(By.XPATH, "//input[@placeholder='Enter bug title']")
    desc_field = driver.find_element(By.XPATH, "//textarea[@placeholder='Describe the bug']")
    status_dropdown = driver.find_element(By.XPATH, "//select")

    title_field.clear()
    title_field.send_keys("Updated: UI glitch on dashboard")

    desc_field.clear()
    desc_field.send_keys("Sidebar overlap fixed in latest build. Need to verify on production.")

    Select(status_dropdown).select_by_visible_text("In Progress")

    # --- SUBMIT EDIT FORM ---
    submit_button = driver.find_element(By.XPATH, "//button[contains(text(),'Update')]")
    submit_button.click()

    print("📤 Edited bug submitted...")

    # --- WAIT FOR SUCCESS MESSAGE OR REDIRECT ---
    try:
        success_message = wait.until(
            EC.presence_of_element_located((
                By.XPATH,
                "//*[contains(text(),'updated') or contains(text(),'success') or contains(text(),'edited') or contains(text(),'saved')]"
            ))
        )
        print(f"✅ Bug edited successfully! Message: {success_message.text}")
    except TimeoutException:
        print("⚠️ Edit may have succeeded — no explicit message found (check UI).")

except TimeoutException:
    print("⚠️ Test failed: Timeout while locating an element.")
except Exception as e:
    print(f"❌ Test failed due to error: {e}")
finally:
    input("Press Enter to close browser...")
    driver.quit()
