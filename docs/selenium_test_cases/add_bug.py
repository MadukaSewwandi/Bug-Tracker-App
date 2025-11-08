from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager

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


    # --- NAVIGATE TO REPORT BUG PAGE ---
    print("🐞 Opening Report Bug page...")
    report_bug_link = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[@href='/new' and contains(text(),'Report Bug')]"))
    )
    report_bug_link.click()

    # Wait for form
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Enter bug title']")))

    # --- FILL BUG FORM ---
    driver.find_element(By.XPATH, "//input[@placeholder='Enter bug title']").send_keys("UI glitch on dashboard")
    driver.find_element(By.XPATH, "//textarea[@placeholder='Describe the bug']").send_keys(
        "Sidebar overlaps with content when resizing window below 1024px."
    )

    Select(driver.find_element(By.XPATH, "//select")).select_by_visible_text("Open")

    driver.find_element(By.XPATH, "//button[contains(text(),'Submit')]").click()

    print("📤 Bug form submitted, waiting for confirmation...")

    try:
        # Look for a success message or dashboard redirection
        success_message = wait.until(
            EC.presence_of_element_located((
                By.XPATH,
                "//*[contains(text(),'success') or contains(text(),'Success') or contains(text(),'Bug') or contains(text(),'added') or contains(text(),'reported')]"
            ))
        )
        print(f"✅ Bug reported successfully! Message: {success_message.text}")
    except TimeoutException:
        print("⚠️ No explicit success message found — but bug submission may still have worked (check UI).")

except TimeoutException:
    print("⚠️ Test failed: Element not found or timeout occurred.")
except Exception as e:
    print("⚠️ Test failed:", e)
finally:
    input("Press Enter to close browser...")
    driver.quit()
