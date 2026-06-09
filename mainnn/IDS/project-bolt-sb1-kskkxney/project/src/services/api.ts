// API service for Django backend communication
const API_BASE_URL = 'http://localhost:8000';

export interface LoginData {
  username: string;
  password: string;
}

export interface SignUpData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface TrafficData {
  timestamp: string;
  src_ip: string;
  dest_ip: string;
  protocol: string;
  prediction: string;
}

export interface AnomalyStats {
  total_traffic: number;
  total_anomalies: number;
  recent_anomalies_24h: number;
  active_users: number;
  anomaly_percentage: number;
  latest_anomalies: TrafficData[];
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Get CSRF token from Django
export const getCSRFToken = async (): Promise<string> => {
  try {
    await fetch(`${API_BASE_URL}/`, {
      credentials: 'include',
    });
    const cookies = document.cookie.split(';');
    const csrfCookie = cookies.find(cookie => cookie.trim().startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : '';
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    return '';
  }
};

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const csrfToken = await getCSRFToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken,
  };

  const config: RequestInit = {
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response;
};

// Authentication APIs
export const loginUser = async (data: LoginData): Promise<any> => {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const response = await apiRequest('/login/', {
    method: 'POST',
    headers: {},
    body: formData,
  });

  return response;
};

export const signUpUser = async (data: SignUpData): Promise<any> => {
  const formData = new FormData();
  formData.append('firstname', data.firstname);
  formData.append('lastname', data.lastname);
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);

  const response = await apiRequest('/signup/', {
    method: 'POST',
    headers: {},
    body: formData,
  });

  return response;
};

export const logoutUser = async (): Promise<any> => {
  const response = await apiRequest('/logout/', {
    method: 'POST',
  });
  return response;
};

// Traffic monitoring APIs
export const getLatestTraffic = async (): Promise<TrafficData[]> => {
  const response = await apiRequest('/latest_traffic/');
  return response.json();
};

export const getAnomalyStats = async (): Promise<AnomalyStats> => {
  const response = await apiRequest('/anomaly_stats/');
  return response.json();
};

export const startTrafficMonitoring = async (): Promise<any> => {
  const response = await apiRequest('/start_monitoring/', {
    method: 'POST',
  });
  return response.json();
};

export const stopTrafficMonitoring = async (): Promise<any> => {
  const response = await apiRequest('/stop_monitoring/', {
    method: 'POST',
  });
  return response.json();
};

export const testEmailNotification = async (): Promise<any> => {
  const response = await apiRequest('/test_email/', {
    method: 'POST',
  });
  return response.json();
};

// Contact form API
export const submitContactForm = async (data: ContactData): Promise<any> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('subject', data.subject);
  formData.append('message', data.message);

  const response = await apiRequest('/contact-us/', {
    method: 'POST',
    headers: {},
    body: formData,
  });

  return response;
};

// User session management
export const getCurrentUser = (): string | null => {
  // Check if user is logged in (you might want to implement a proper endpoint for this)
  return localStorage.getItem('currentUser');
};

export const setCurrentUser = (username: string): void => {
  localStorage.setItem('currentUser', username);
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem('currentUser');
};
