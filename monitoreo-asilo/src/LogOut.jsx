const LogOut = () => {

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
      
        if (error) {
          console.error('Error logging out:', error);
        } else {
          navigate('/');
        }
      };

    return (
    <>
        <button onClick={handleLogout}>Log Out</button>
    </>
)

}

export default LogOut;