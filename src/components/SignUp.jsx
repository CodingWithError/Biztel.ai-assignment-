import { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/auth';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: '20px',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
  width: '100%',
  maxWidth: '400px',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  overflow: 'auto',
});

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Name, email, and password fields are required');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Invalid email format');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign Up
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%', mb: 2 }}>{error}</Alert>}
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            required
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              marginBottom: '16px',
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="inviteCode"
            label="Invite Code (Optional)"
            value={formData.inviteCode}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#1976d2',
              padding: '12px',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              '&:disabled': {
                backgroundColor: '#90caf9',
              },
            }}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
            sx={{ mt: 1 }}
          >
            Already have an account? Login
          </Button>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SignUp;