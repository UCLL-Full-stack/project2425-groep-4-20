// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import jest from 'jest-mock';
// import UserService from '@services/UserService';
// import LoginForm from '@components/login/loginForm';
// import { describe, it } from 'node:test';

// jest.mock('@services/UserService');

// describe('LoginForm', () => {
//     it('renders the form elements correctly', () => {
//         render(<LoginForm />);

//         expect(screen.getByLabelText('Username')).toBeInTheDocument();
//         expect(screen.getByLabelText('Password')).toBeInTheDocument();
//         expect(screen.getByText('Submit')).toBeInTheDocument();
//     });

//     it('shows error message when username is missing', async () => {
//         render(<LoginForm />);

//         fireEvent.submit(screen.getByRole('form'));

//         await waitFor(() => {
//             expect(screen.getByText('Username is required')).toBeInTheDocument();
//         });
//     });

//     it('shows error message when password is missing', async () => {
//         render(<LoginForm />);

//         fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
//         fireEvent.submit(screen.getByRole('form'));

//         await waitFor(() => {
//             expect(screen.getByText('Password is required')).toBeInTheDocument();
//         });
//     });

//     it('calls UserService.LoginUser on form submission', async () => {
//         const mockLogin = jest.fn().mockResolvedValue({ status: 200, json: () => ({ token: 'test-token' }) });
//         UserService.LoginUser = mockLogin;

//         render(<LoginForm />);

//         fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
//         fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

//         fireEvent.submit(screen.getByRole('form'));

//         await waitFor(() => {
//             expect(mockLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
//         });
//     });

//     it('shows error message if login fails', async () => {
//         const mockLogin = jest.fn().mockResolvedValue({ status: 401, json: () => ({ errorMessage: 'Invalid credentials' }) });
//         UserService.LoginUser = mockLogin;

//         render(<LoginForm />);

//         fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'wronguser' } });
//         fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });

//         fireEvent.submit(screen.getByRole('form'));

//         await waitFor(() => {
//             expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
//         });
//     });
// });
// function expect(arg0: any) {
//     throw new Error('Function not implemented.');
// }

