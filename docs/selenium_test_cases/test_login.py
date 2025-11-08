from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager

# --- Chrome Setup ---
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)  # Keeps browser open

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
driver.maximize_window()

try:
    print("🚀 Launching login page...")
    driver.get("http://localhost:5173/login")  # Your login page URL

    wait = WebDriverWait(driver, 15)

    # Email field
    email_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']")))
    email_field.send_keys("testuser@example.com")
    print("📧 Email entered successfully!")

    # Password field
    password_field = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='password']")))
    password_field.send_keys("password123")
    print("🔐 Password entered successfully!")

    # Login button
    login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//*[@id='root']/div/div/div/div/form/button")))
    login_button.click()
    print("🖱️ Login button clicked!")

    # Wait for dashboard or home page
    wait.until(EC.presence_of_element_located((By.XPATH, "//h2[contains(text(),'Dashboard') or contains(text(),'Home')]")))
    print("✅ Login successful and redirected to dashboard!")

except TimeoutException:
    print("❌ Timeout: One or more elements could not be found.")
except Exception as e:
    print("⚠️ Error occurred:", e)

finally:
    input("Press Enter to close the browser...")
    driver.quit()
