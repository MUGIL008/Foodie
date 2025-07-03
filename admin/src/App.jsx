// App.jsx
import React, { useState } from 'react';
import { Navbar } from './component/Navbar/Navbar';
import { Sidebar } from './component/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { Add } from './pages/Add/Add';
import { Order } from './pages/Orders/Order';
import { List } from './pages/List/List';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


const App = () => {
  const url = "http://localhost:4000";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    console.log(loginData);
    
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/data/login`, loginData);
      console.log('role:'+res.data.role);
      if (res.data.success) {
        const token = res.data.token;
        const decoded = JSON.parse(atob(token.split('.')[1]));
        // console.log(decoded);
        

        if (decoded.role!== 'admin' && decoded.role !== 'ADMIN') {
          console.log('ROLE'+decoded.role);
          
          alert("Access denied: Not an admin.");
          return;
        }

        localStorage.setItem("admin-token", token);
        setIsLoggedIn(true);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <ToastContainer />
      {
        !isLoggedIn ? (
         <div className="login-container">
              <h2>Admin Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <button type="submit">Login</button>
              </form>
          </div>





        ) : (
          <>
            <Navbar />
            <hr />
            <div className="app-content">
              <Sidebar />
              <Routes>
                <Route path="/add" element={<Add url={url} />} />
                <Route path="/list" element={<List url={url} />} />
                <Route path="/orders" element={<Order url={url} />} />
              </Routes>
            </div>
          </>
        )
      }
    </div>
  );
};

export default App;
















































// App.jsx (Updated Admin Panel with Dark Theme, Animation, Icons, and Responsive Layout)
// import React, { useState } from 'react';
// import { Navbar } from './component/Navbar/Navbar';
// import { Sidebar } from './component/Sidebar/Sidebar';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import { Add } from './pages/Add/Add';
// import { Order } from './pages/Orders/Order';
// import { List } from './pages/List/List';
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css'; // Include updated CSS

// const App = () => {
//   const url = "http://localhost:4000";
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loginData, setLoginData] = useState({ email: '', password: '' });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${url}/api/data/login`, loginData);
//       if (res.data.success) {
//         const token = res.data.token;
//         const decoded = JSON.parse(atob(token.split('.')[1]));

//         if (decoded.role !== 'admin' && decoded.role !== 'ADMIN') {
//           alert("Access denied: Not an admin.");
//           return;
//         }

//         localStorage.setItem("admin-token", token);
//         setIsLoggedIn(true);
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className='app'>
//       <ToastContainer />
//       {
//         !isLoggedIn ? (
//           <div className="login-container dark-theme">
//             <h2>Admin Login</h2>
//             <form onSubmit={handleLogin} className="login-form">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={loginData.email}
//                 onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={loginData.password}
//                 onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                 required
//               />
//               <button type="submit">Login</button>
//             </form>
//           </div>
//         ) : (
//           <div className='main-layout dark-theme'>
//             <Navbar setIsLoggedIn={setIsLoggedIn} />
//             <div className="layout-body">
//               <Sidebar />
//               <div className="page-content">
//                 <Routes>
//                   <Route path="/" element={<Navigate to="/add" />} />
//                   <Route path="/add" element={<Add url={url} />} />
//                   <Route path="/list" element={<List url={url} />} />
//                   <Route path="/orders" element={<Order url={url} />} />
//                 </Routes>
//               </div>
//             </div>
//           </div>
//         )
//       }
//     </div>
//   );
// };

// export default App;
