import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiCheck, FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';
import './Planner.css';

const DEFAULT_CATEGORIES = ['Clothes', 'Documents', 'Gadgets', 'Health', 'Toiletries', 'Misc'];

export default function Planner() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [trip, setTrip] = useState({ destination: '', days: '', type: 'Leisure' });
  const [isGenerated, setIsGenerated] = useState(false);
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState({ text: '', category: 'Clothes' });
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    if (!user) {
      navigate('/login');
    } else {
      setUserInfo(user);
      fetchTasks(user.token);
    }
  }, [navigate]);

  const fetchTasks = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        // map _id to id for existing logic
        const formattedData = data.map(task => ({
          ...task,
          id: task._id
        }));
        setChecklist(formattedData);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerated(true);
    
    // Auto-generate some items if they don't exist
    if (trip.type === 'Business' && !checklist.find(i => i.text === 'Laptop & Charger')) {
      await addTask('Laptop & Charger', 'Gadgets');
    }
  };

  const addTask = async (text, category) => {
    if (!text.trim()) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ 
          text, 
          category,
          tripDestination: trip.destination,
          tripType: trip.type
        })
      });
      const data = await res.json();
      if (res.ok) {
        setChecklist([{ ...data, id: data._id }, ...checklist]);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    await addTask(newItem.text, newItem.category);
    setNewItem({ text: '', category: newItem.category });
  };

  const togglePacked = async (id, currentPackedStatus) => {
    // Optimistic UI update
    setChecklist(checklist.map(item => item.id === id ? { ...item, packed: !currentPackedStatus } : item));
    
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ packed: !currentPackedStatus })
      });
    } catch (error) {
      console.error('Error updating task:', error);
      // Revert if failed
      setChecklist(checklist.map(item => item.id === id ? { ...item, packed: currentPackedStatus } : item));
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      if (res.ok) {
        setChecklist(checklist.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <div className="container section-padding" style={{textAlign:'center'}}>Loading Planner...</div>;

  const filteredList = activeTab === 'All' ? checklist : checklist.filter(c => c.category === activeTab);
  const categoriesPresent = ['All', ...new Set(checklist.map(c => c.category))];
  
  const totalItems = checklist.length;
  const packedItems = checklist.filter(c => c.packed).length;
  const progress = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <div className="planner-container container section-padding">
      <div className="planner-header">
        <h1>Smart Trip Planner</h1>
        <p>Your personalized packing assistant</p>
      </div>

      <div className="planner-layout">
        {/* Left Side: Input & Stats */}
        <div className="planner-sidebar">
          <div className="card trip-card">
            <h3>Trip Details</h3>
            <form onSubmit={handleGenerate}>
              <div className="form-group planner-form-group">
                <FiMapPin className="input-icon" />
                <input 
                  type="text" 
                  placeholder="Destination" 
                  value={trip.destination} 
                  onChange={(e) => setTrip({...trip, destination: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group planner-form-group">
                <FiCalendar className="input-icon" />
                <input 
                  type="number" 
                  placeholder="Days" 
                  value={trip.days} 
                  onChange={(e) => setTrip({...trip, days: e.target.value})}
                  required 
                  min="1"
                />
              </div>
              <div className="form-group planner-form-group">
                <FiBriefcase className="input-icon" />
                <select value={trip.type} onChange={(e) => setTrip({...trip, type: e.target.value})}>
                  <option value="Leisure">Leisure</option>
                  <option value="Business">Business</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Family">Family</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-full mt-sm">Save Trip Settings</button>
            </form>
          </div>

          <motion.div 
            className="card progress-card mt-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Packing Progress</h3>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-text">{packedItems} of {totalItems} items packed ({progress}%)</p>
          </motion.div>
        </div>

        {/* Right Side: Interactive Checklist */}
        <div className="planner-main card">
          <div className="checklist-header">
            <h3>Your Packing List</h3>
            <div className="tabs">
              {categoriesPresent.map(cat => (
                <button 
                  key={cat} 
                  className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="checklist-items">
            <AnimatePresence>
              {filteredList.map(item => (
                <motion.div 
                  key={item.id} 
                  className={`checklist-item ${item.packed ? 'packed' : ''}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={item.packed} 
                      onChange={() => togglePacked(item.id, item.packed)} 
                    />
                    <span className="checkmark"><FiCheck className="check-icon" /></span>
                    <span className="item-text">{item.text}</span>
                  </label>
                  <div className="item-actions">
                    <span className="item-badge">{item.category}</span>
                    <button onClick={() => deleteItem(item.id)} className="delete-btn"><FiTrash2 /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredList.length === 0 && (
              <p className="empty-state">No items found in this category.</p>
            )}
          </div>

          <div className="add-item-form-container mt-lg">
            <h4>Add Custom Item</h4>
            <form onSubmit={handleAddItem} className="add-item-form">
              <input 
                type="text" 
                placeholder="Item name (e.g. Camera)" 
                value={newItem.text}
                onChange={(e) => setNewItem({...newItem, text: e.target.value})}
                required
              />
              <select 
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              >
                {DEFAULT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <button type="submit" className="btn btn-primary"><FiPlus /> Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
