// src/actions.ts

export async function registerAction(prevState: any, formData: FormData) {
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