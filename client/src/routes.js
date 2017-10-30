import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';

// Import static pages
import HomePage from './components/pages/home-page';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import ForgotPassword from './components/auth/forgot_password';
import ResetPassword from './components/auth/reset_password';

// Import dashboard pages
import Dashboard from './components/dashboard/dashboard';
import ViewProfile from './components/dashboard/profile/view-profile';

// Import Calendar pages
import MyCalendar from './components/pages/calendar/myCalendar';
import Calendar from './components/pages/calendar';
import NewEvent from './components/pages/newEvent';
import TaskManager from './components/pages/todoList/TaskManager';
import NewTodoList from './components/pages/todoList/NewTodoList';
import TaskPage from './todoApp/views/pages/tasks/tasks-page';

// Import admin pages
import AdminDashboard from './components/admin/dashboard';

// Import higher order components
import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="forgot-password" component={ForgotPassword} />
    <Route path="reset-password/:resetToken" component={ResetPassword} />

    <Route path="profile" component={RequireAuth(ViewProfile)} />

    <Route path="admin" component={RequireAuth(AdminDashboard)} />

    <Route path="calendar" component={RequireAuth(Calendar, NewEvent)} />
    <Route path="new-calendar" component={RequireAuth(MyCalendar)} />
    <Route path="tasks" component={RequireAuth(TaskManager)} />
    <Route path="new-tasks" component={RequireAuth(NewTodoList, TaskPage)} />

    <Route path="dashboard">
      <IndexRoute component={RequireAuth(Dashboard)} />
    </Route>

    <Route path="*" component={NotFoundPage} />
  </Route>
);
