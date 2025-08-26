import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Menu,
  Building,
  Search,
  Plus,
  Edit,
  Trash2,
  LogOut,
  User,
  Lock,
  ListX,
  FolderX,
  X,
  CircleCheck,
  Users,
  ArrowLeft
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';

// Main application component for the restaurant management dashboard
const App = () => {
  // State to manage application flow and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyAytjQ-LHRSXLT0bby2tN-I9MDNUHfd1A0",
    authDomain: "dineeasy-9bc52.firebaseapp.com",
    projectId: "dineeasy-9bc52",
    storageBucket: "dineeasy-9bc52.firebasestorage.app",
    messagingSenderId: "287527084724",
    appId: "1:287527084724:web:9483033d96c7c8a81b6de1",
    measurementId: "G-Z7KLKXY58J"
  };

  // Initialize Firebase and set up auth listener on component mount
  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);
      setDb(firestoreDb);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        setIsLoading(false);
        if (user) {
          setIsLoggedIn(true);
          setUserName(user.email);
        } else {
          setIsLoggedIn(false);
          setUserName('');
          setCurrentView('dashboard');
        }
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Firebase initialization failed:", e);
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setUserName('');
    setCurrentView('dashboard');
  };

  const handleManageUsers = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('users');
  };

  const handleReturnToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedRestaurant(null);
  };

  // Login Page component
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onLoginSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setError("Invalid email or password.");
        console.error("Login failed:", error);
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          <form onSubmit={onLoginSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-semibold bg-purple-600 rounded-full hover:bg-purple-700 transition duration-200"
            >
              Log In
            </button>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          </form>
        </div>
      </div>
    );
  };
  
  const Dashboard = ({ userName, handleLogout, db, auth, onManageUsers }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSearchQuery, setFilteredSearchQuery] = useState('');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const userDropdownRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      owner: '',
      contact: '',
      address: '',
      onboardingDate: '',
      planType: 'Basic',
      lastPayment: '',
    });
    const [restaurants, setRestaurants] = useState([]);
    const [userId, setUserId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [restaurantToDelete, setRestaurantToDelete] = useState(null);
    const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showLimitModal, setShowLimitModal] = useState(false);

    const isSuperAdmin = userName === 'admin@dineeasy.com';

    // Limits based on plan type
    const restaurantLimits = {
      'Trial': 1,
      'Basic': 2,
      'Premium': 10,
      'SuperAdmin': Infinity,
    };
    
    // Fetch restaurants from Firestore and listen for changes
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null); // Clear userId on logout
            }
        });
        return () => unsubscribeAuth();
    }, [auth]);

    useEffect(() => {
        if (!db || !userId) return;

        const restaurantsRef = collection(db, 'restaurants');
        let q;

        if (isSuperAdmin) {
          q = query(restaurantsRef);
        } else {
          q = query(restaurantsRef, where('owner', '==', userName));
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const restaurantsData = [];
            querySnapshot.forEach((doc) => {
                restaurantsData.push({ id: doc.id, ...doc.data() });
            });
            setRestaurants(restaurantsData);
        }, (error) => {
            console.error("Error fetching data:", error);
        });
        return () => unsubscribe();
    }, [db, userId, userName, isSuperAdmin]);
  
    // Effect to handle clicks outside of the user dropdown
    useEffect(() => {
      function handleClickOutside(event) {
        if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
          setShowUserDropdown(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [userDropdownRef]);

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleSearchKeyDown = (e) => {
      if (e.key === 'Enter') {
        setFilteredSearchQuery(searchQuery);
      }
    };
    
    const handleAddRestaurant = () => {
      const planType = isSuperAdmin ? 'SuperAdmin' : 'Basic'; // Default to Basic for regular users
      const currentLimit = restaurantLimits[planType];
      if (restaurants.length >= currentLimit) {
        setShowLimitModal(true);
        return;
      }

      setEditingRestaurant(null);
      setFormData({
        name: '',
        owner: userName, // Set owner to the logged-in user's email
        contact: '',
        address: '',
        onboardingDate: '',
        planType: 'Basic',
        lastPayment: '',
      });
      setShowModal(true);
    };

    const handleEditRestaurant = (restaurant) => {
      setEditingRestaurant(restaurant);
      setFormData(restaurant);
      setShowModal(true);
    };

    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      if (!db) {
        console.error("Firestore is not initialized.");
        return;
      }
    
      try {
        if (editingRestaurant) {
          const restaurantRef = doc(db, 'restaurants', editingRestaurant.id);
          await setDoc(restaurantRef, formData);
          showSuccessMessage("Restaurant updated successfully!");
        } else {
          const restaurantsRef = collection(db, 'restaurants');
          const newDocRef = doc(restaurantsRef);
          await setDoc(newDocRef, { ...formData });
          showSuccessMessage("Restaurant added successfully!");
        }
        setShowModal(false);
      } catch (e) {
        console.error("Error saving document: ", e);
      }
    };

    const handleDeleteClick = (restaurant) => {
      setRestaurantToDelete(restaurant);
      setShowDeleteModal(true);
    };

    const handleDeleteRestaurant = async () => {
      if (deleteConfirmationText.toUpperCase() !== 'DELETE') {
        return;
      }
      if (!db || !restaurantToDelete) {
        console.error("Firestore is not initialized or no restaurant selected.");
        return;
      }

      try {
        const docRef = doc(db, 'restaurants', restaurantToDelete.id);
        await deleteDoc(docRef);
        showSuccessMessage("Restaurant deleted successfully!");
        setShowDeleteModal(false);
        setRestaurantToDelete(null);
        setDeleteConfirmationText('');
      } catch (e) {
        console.error("Error removing document: ", e);
      }
    };

    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(filteredSearchQuery.toLowerCase()) ||
      restaurant.owner.toLowerCase().includes(filteredSearchQuery.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(filteredSearchQuery.toLowerCase())
    );

    return (
      <div className="flex bg-gray-100 min-h-screen font-sans antialiased">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-6 shadow-md rounded-lg m-4">
          <div className="flex items-center space-x-2 text-xl font-bold text-gray-800 mb-8">
            <Building className="text-purple-600" />
            <span>DineEase</span>
          </div>
          <nav>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition duration-200"
                >
                  <Menu className="w-5 h-5" />
                  <span>Menu</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-purple-600 font-semibold bg-white/30 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/50 ring-1 ring-purple-600 transition duration-200"
                >
                  <Building className="w-5 h-5" />
                  <span>Restaurants</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-800">Restaurant Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, owner, or address..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
                onClick={handleAddRestaurant}
              >
                <Plus className="w-5 h-5" />
                <span>Add Restaurant</span>
              </button>
              <div className="relative">
                <div
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300 transition duration-200"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  ref={userDropdownRef}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold">
                    {userName[0] ? userName[0].toUpperCase() : 'U'}
                  </div>
                  <span>{userName}</span>
                </div>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Owner</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Address</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Onboarding Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Plan Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Last Payment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRestaurants.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        {searchQuery ? (
                          <>
                            <ListX className="w-12 h-12 mb-2 text-gray-400" />
                            <p className="text-lg">No matching restaurants found.</p>
                          </>
                        ) : (
                          <>
                            <FolderX className="w-12 h-12 mb-2 text-gray-400" />
                            <p className="text-lg">No restaurants available.</p>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRestaurants.map((restaurant) => (
                    <tr key={restaurant.id} className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200">
                      <td className="py-4 px-4 text-gray-800 font-medium">{restaurant.name}</td>
                      <td className="py-4 px-4 text-blue-600 underline cursor-pointer">
                        <span>{restaurant.owner}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{restaurant.contact}</td>
                      <td className="py-4 px-4 text-gray-600">{restaurant.address}</td>
                      <td className="py-4 px-4 text-gray-600">{restaurant.onboardingDate}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            restaurant.planType === 'Premium'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {restaurant.planType}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{restaurant.lastPayment}</td>
                      <td className="py-4 px-4 flex items-center space-x-2">
                        <button 
                          className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 transition-colors duration-200" 
                          onClick={() => onManageUsers(restaurant)}
                        >
                          Manage Users
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" onClick={() => handleEditRestaurant(restaurant)}>
                          <Edit className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" onClick={() => handleDeleteClick(restaurant)}>
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800 transition-colors duration-200">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Owner</label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleFormChange}
                    pattern="^\+?\d+$"
                    title="Please enter a valid phone number (e.g., +1234567890)"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    maxLength="100"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1 text-right">{formData.address.length} / 100</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Onboarding Date</label>
                  <input
                    type="date"
                    name="onboardingDate"
                    value={formData.onboardingDate}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Plan Type</label>
                  <select
                    name="planType"
                    value={formData.planType}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Free">Free</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Trial">Trial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Payment (INR)</label>
                  <input
                    type="text"
                    name="lastPayment"
                    value={formData.lastPayment}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h3>
              <p className="text-gray-700 mb-4">
                You are about to delete **{restaurantToDelete?.name}**. 
                This action is irreversible and will delete all associated users, menu, orders, and data.
              </p>
              <p className="text-gray-700 mb-2">
                Please type **DELETE** to confirm.
              </p>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
              />
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRestaurant}
                  disabled={deleteConfirmationText.toUpperCase() !== 'DELETE'}
                  className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
                    deleteConfirmationText.toUpperCase() === 'DELETE' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-red-400 cursor-not-allowed'
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {showLimitModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm mx-auto">
              <h3 className="text-xl font-bold mb-4 text-red-600">Limit Reached</h3>
              <p className="text-gray-700 mb-4">
                You have reached the maximum number of restaurants for your plan. Please upgrade your plan to add more.
              </p>
              <p className="text-gray-700 mb-4">
                Contact customer support:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Phone: **+1-555-555-5555**</li>
                <li>Email: **support@dineease.com**</li>
              </ul>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowLimitModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        {successMessage && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 p-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center space-x-2">
            <CircleCheck className="w-6 h-6" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>
    );
  };

  const UserManagementPage = ({ selectedRestaurant, db, auth, goBack, userName }) => {
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUserFormData, setNewUserFormData] = useState({ email: '', password: '', role: 'Waiter' });
    const [addUserError, setAddUserError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const userLimits = {
      'Trial': 5,
      'Basic': 20,
      'Premium': 100,
    };
    const userLimit = userLimits[selectedRestaurant.planType];

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Fetch users for the selected restaurant
    useEffect(() => {
        if (!db || !selectedRestaurant) return;
        setIsLoadingUsers(true);

        const usersRef = collection(db, 'restaurant-users');
        const q = query(usersRef, where('restaurantId', '==', selectedRestaurant.id));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const usersData = [];
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                usersData.push({
                    id: doc.id,
                    ...userData,
                    password: '********',
                    status: userData.disabled ? 'Disabled' : 'Enabled',
                    lastLoginTime: userData.lastLoginTime || 'N/A', 
                });
            });
            setUsers(usersData);
            setIsLoadingUsers(false);
        }, (error) => {
            console.error("Error fetching users:", error);
            setIsLoadingUsers(false);
        });

        return () => unsubscribe();
    }, [db, selectedRestaurant]);
    
    const handleAddUser = async (e) => {
        e.preventDefault();
        setAddUserError('');

        if (users.length >= userLimit) {
          setAddUserError(`You have reached the limit of ${userLimit} users for the ${selectedRestaurant.planType} plan.`);
          return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, newUserFormData.email, newUserFormData.password);
            
            await addDoc(collection(db, 'restaurant-users'), {
                userId: userCredential.user.uid,
                restaurantId: selectedRestaurant.id,
                role: newUserFormData.role,
                email: newUserFormData.email,
                lastLoginTime: new Date().toISOString(),
                disabled: false
            });

            showSuccessMessage(`User ${newUserFormData.email} added successfully!`);
            setShowAddUserModal(false);
            setNewUserFormData({ email: '', password: '', role: 'Waiter' });
        } catch (error) {
            setAddUserError("Error adding user: " + error.message);
            console.error("Error adding user:", error);
        }
    };
    
    const handleToggleStatus = async (user) => {
      try {
        const userRef = doc(db, 'restaurant-users', user.id);
        await updateDoc(userRef, {
          disabled: !user.disabled
        });
        showSuccessMessage(`User ${user.email} status updated.`);
      } catch (error) {
        console.error("Error toggling user status:", error);
      }
    };

    return (
        <div className="p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-800">Users for {selectedRestaurant.name}</h1>
                <div className="flex items-center space-x-4">
                  <button onClick={goBack} className="flex items-center space-x-2 px-4 py-2 text-gray-700 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                      <ArrowLeft className="w-5 h-5" />
                      <span>Return to Restaurants</span>
                  </button>
                  <button onClick={() => setShowAddUserModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-200">
                      <Plus className="w-5 h-5" />
                      <span>Add User</span>
                  </button>
                </div>
            </header>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Password</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Role</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Last Login Time</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoadingUsers ? (
                            <tr>
                                <td colSpan="6" className="py-10 text-center text-gray-500">
                                    Loading users...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <ListX className="w-12 h-12 mb-2 text-gray-400" />
                                        <p className="text-lg">No users found for this restaurant.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200">
                                    <td className="py-4 px-4 text-gray-800 font-medium">{user.email}</td>
                                    <td className="py-4 px-4 text-gray-600">********</td>
                                    <td className="py-4 px-4 text-gray-600">{user.role}</td>
                                    <td className="py-4 px-4 text-gray-600">
                                      <button 
                                        onClick={() => handleToggleStatus(user)}
                                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                          user.status === 'Enabled'
                                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                                        }`}
                                      >
                                        {user.status}
                                      </button>
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">{user.lastLoginTime}</td>
                                    <td className="py-4 px-4 flex items-center space-x-2">
                                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                                            <Edit className="w-5 h-5 text-gray-500" />
                                        </button>
                                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                                            <Trash2 className="w-5 h-5 text-red-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Modal for adding a user */}
            {showAddUserModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Add User</h3>
                            <button onClick={() => setShowAddUserModal(false)} className="text-gray-500 hover:text-gray-800">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={newUserFormData.email}
                                    onChange={(e) => setNewUserFormData({...newUserFormData, email: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={newUserFormData.password}
                                    onChange={(e) => setNewUserFormData({...newUserFormData, password: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    value={newUserFormData.role}
                                    onChange={(e) => setNewUserFormData({...newUserFormData, role: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                >
                                    <option>Admin</option>
                                    <option>Chef</option>
                                    <option>Waiter</option>
                                </select>
                            </div>
                            {addUserError && <p className="text-red-500 text-sm text-center">{addUserError}</p>}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddUserModal(false)}
                                    className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
  };

  return (
    <div className="font-sans antialiased">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p>Connecting to Firebase...</p>
        </div>
      ) : isLoggedIn ? (
        currentView === 'dashboard' ? (
          <Dashboard userName={userName} handleLogout={handleLogout} db={db} auth={auth} onManageUsers={handleManageUsers} />
        ) : (
          <UserManagementPage selectedRestaurant={selectedRestaurant} db={db} auth={auth} goBack={handleReturnToDashboard} userName={userName} />
        )
      ) : (
        <LoginPage auth={auth} />
      )}
    </div>
  );
};

export default App;
