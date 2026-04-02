// src/actions.ts

export async function registerAction(_prevState: any, formData: FormData) {
  // 1. Extract the data from the form
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    // 2. Fetch the "Approved" employee list
    const response = await fetch('http://localhost:3001/users');
    if (!response.ok) throw new Error('Database connection failed');
    
    const users = await response.json();

    // 3. The "Pre-Check"
    const existingUser = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!existingUser) {
      return { 
        success: false, 
        message: "Entry Denied: This email is not in our employee database. Please contact HR to add your email." 
      };
    }

    if (existingUser.registered) {
      return {
        success: false,
        message: "This account has already been registered. Please sign in instead."
      };
    }

    // 4. Update the user (The "Registration" step)
    const updateResponse = await fetch(`http://localhost:3001/users/${existingUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        password, 
        registered: true,
        status: 'Active' 
      }),
    });

    if (!updateResponse.ok) throw new Error('Failed to update user');

    return { 
      success: true, 
      message: "Account verified! You can now sign in." 
    };

  } catch (e) {
    return { 
      success: false, 
      message: "System error: Could not reach the server." 
    };
  }
}

export async function loginAction(_prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await fetch('http://localhost:3001/users');
    if (!response.ok) throw new Error('Database connection failed');
    
    const users = await response.json();

    const user = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { 
        success: false, 
        message: "Invalid email or password." 
      };
    }

    if (!user.registered) {
      return {
        success: false,
        message: "Your account is not registered. Please register first."
      };
    }

    return { 
      success: true, 
      message: "Login successful",
      user 
    };

  } catch (e) {
    return { 
      success: false, 
      message: "System error: Could not reach the server." 
    };
  }
}