
/**
 * IoT Service for Smart Reminder Mat
 * Handles communication with the ESP32 device
 */

// Default ESP32 address (can be configured by user)
let esp32Address = 'http://192.168.1.1';

// Function to set the ESP32 IP address
export const setESP32Address = (address: string) => {
  if (!address.startsWith('http://')) {
    address = `http://${address}`;
  }
  esp32Address = address;
  localStorage.setItem('esp32Address', address);
  return esp32Address;
};

// Function to get the ESP32 IP address
export const getESP32Address = (): string => {
  const savedAddress = localStorage.getItem('esp32Address');
  if (savedAddress) {
    esp32Address = savedAddress;
  }
  return esp32Address;
};

// Function to get the current weight from the ESP32
export const getCurrentWeight = async (): Promise<number> => {
  try {
    const response = await fetch(`${esp32Address}/getWeight`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text();
    return parseFloat(data);
  } catch (error) {
    console.error('Error fetching weight:', error);
    return 0;
  }
};

// Function to set user-defined items on the ESP32
export const setUserItems = async (items: string[]): Promise<boolean> => {
  try {
    const itemsString = items.join(',');
    const response = await fetch(`${esp32Address}/setItems?items=${encodeURIComponent(itemsString)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('Error setting items:', error);
    return false;
  }
};

// Function to check connection with ESP32
export const checkConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(esp32Address, { method: 'HEAD', timeout: 3000 });
    return response.ok;
  } catch (error) {
    console.error('Error connecting to ESP32:', error);
    return false;
  }
};

// Add type for timeout option in fetch
interface TimeoutOptions extends RequestInit {
  timeout?: number;
}

// Custom fetch with timeout
const fetchWithTimeout = async (
  resource: RequestInfo, 
  options: TimeoutOptions = {}
): Promise<Response> => {
  const { timeout = 8000, ...restOptions } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(resource, {
    ...restOptions,
    signal: controller.signal
  });
  clearTimeout(id);
  
  return response;
};

