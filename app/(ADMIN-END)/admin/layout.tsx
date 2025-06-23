"use client";
import { useState, useEffect } from "react";
import { 
  LogOut, LayoutDashboard, Boxes, Tag, Users, ShoppingCart, BarChart2, 
  Settings, ShieldCheck, Plus, Edit, Trash2, Eye, Search, Filter, 
  Download, Mail, Package, DollarSign, Image as ImageIcon, UserPlus,
  TrendingUp, Calendar, Clock, CheckCircle, XCircle, AlertCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([
    { 
      id: 'PRD001', 
      name: 'Corporate Blazer Set', 
      category: 'corporate', 
      price: 45000, 
      stock: 12, 
      weight: 0.8, 
      colors: ['Black', 'Navy'], 
      sizeModEnabled: true,
      sizes: ['S', 'M', 'L'],
      image: '/blazer-set.jpg',
      description: 'Premium corporate blazer set for professional women'
    },
    { 
      id: 'PRD002', 
      name: 'Ankara Midi Dress', 
      category: 'traditional', 
      price: 28000, 
      stock: 8, 
      weight: 0.5, 
      colors: ['Multi'], 
      sizeModEnabled: false,
      sizes: ['M', 'L', 'XL'],
      image: '/ankara-dress.jpg',
      description: 'Beautiful handcrafted Ankara midi dress'
    }
  ]);
  
  const [categories, setCategories] = useState([
    { id: 'CAT001', name: 'Corporate', description: 'Professional business attire', productCount: 15, active: true },
    { id: 'CAT002', name: 'Traditional', description: 'African traditional wear', productCount: 8, active: true },
    { id: 'CAT003', name: 'Casual', description: 'Everyday casual wear', productCount: 12, active: true },
    { id: 'CAT004', name: 'Accessories', description: 'Fashion accessories', productCount: 6, active: false }
  ]);
  
  const [customers, setCustomers] = useState([
    { id: 'CUST001', name: 'obiora david', email: 'adunni@email.com', phone: '08012345678', lastVisit: '2024-06-20', lastPurchase: '2024-06-15', category: 'corporate', totalSpent: 145000, orders: 5 },
    { id: 'CUST002', name: 'chimobi lebechukwu', email: 'kemi@email.com', phone: '08087654321', lastVisit: '2024-06-19', lastPurchase: '2024-06-10', category: 'casual', totalSpent: 78000, orders: 3 },
    { id: 'CUST003', name: 'chidubem', email: 'folake@email.com', phone: '08098765432', lastVisit: '2024-06-18', lastPurchase: '2024-06-12', category: 'traditional', totalSpent: 92000, orders: 4 }
  ]);
  
  const [orders, setOrders] = useState([
    { id: 'ORD001', customerId: 'CUST001', productId: 'PRD001', quantity: 2, amount: 90000, size: 'M', sizeModification: 'Yes', deliveryStatus: 'Delivered', paymentChannel: 'Card', date: '2024-06-15' },
    { id: 'ORD002', customerId: 'CUST002', productId: 'PRD002', quantity: 1, amount: 28000, size: 'L', sizeModification: 'No', deliveryStatus: 'Shipped', paymentChannel: 'Transfer', date: '2024-06-10' },
    { id: 'ORD003', customerId: 'CUST001', productId: 'PRD002', quantity: 1, amount: 28000, size: 'M', sizeModification: 'No', deliveryStatus: 'Processing', paymentChannel: 'Card', date: '2024-06-18' }
  ]);

  const [adminUsers, setAdminUsers] = useState([
    { id: 'ADM001', name: 'Super Admin', email: 'admin@marobi.com', role: 'Super Admin', permissions: ['all'], lastLogin: '2024-06-22', active: true },
    { id: 'ADM002', name: 'Store Manager', email: 'manager@marobi.com', role: 'Manager', permissions: ['products', 'orders', 'customers'], lastLogin: '2024-06-21', active: true },
    { id: 'ADM003', name: 'Sales Rep', email: 'sales@marobi.com', role: 'Sales', permissions: ['orders', 'customers'], lastLogin: '2024-06-20', active: false }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '', 
    description: '', 
    category: 'corporate', 
    price: '', 
    weight: '', 
    colors: '', 
    sizeModEnabled: false, 
    sizes: '',
    image: null,
    imagePreview: ''
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    active: true
  });

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'corporate'
  });

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Sales',
    permissions: []
  });

  const [newSale, setNewSale] = useState({
    productId: '', 
    quantity: '', 
    size: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Navigation items
  const navItems = [
    { name: "Dashboard", key: "dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", key: "products", icon: <Boxes size={20} /> },
    { name: "Categories", key: "categories", icon: <Tag size={20} /> },
    { name: "Orders", key: "orders", icon: <ShoppingCart size={20} /> },
    { name: "Customers", key: "customers", icon: <Users size={20} /> },
    { name: "Log Sale", key: "log-sale", icon: <DollarSign size={20} /> },
    { name: "Admin Users", key: "admin-users", icon: <ShieldCheck size={20} /> },
    { name: "Analytics", key: "analytics", icon: <BarChart2 size={20} /> },
    { name: "Marketing", key: "marketing", icon: <Mail size={20} /> },
    { name: "Settings", key: "settings", icon: <Settings size={20} /> }
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate dashboard metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const monthlyRevenue = orders
    .filter(o => new Date(o.date).getMonth() === new Date().getMonth())
    .reduce((sum, o) => sum + o.amount, 0);
  
  const topSellingProduct = products.reduce((top, product) => {
    const productOrders = orders.filter(o => o.productId === product.id);
    const totalSold = productOrders.reduce((sum, o) => sum + o.quantity, 0);
    return totalSold > (top.totalSold || 0) ? { ...product, totalSold } : top;
  }, {});

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill all required fields');
      return;
    }

    const productId = `PRD${String(products.length + 1).padStart(3, '0')}`;
    const colors = newProduct.colors.split(',').map(c => c.trim());
    const sizes = newProduct.sizes.split(',').map(s => s.trim());
    
    const product = {
      ...newProduct,
      id: productId,
      stock: 0,
      colors,
      sizes,
      price: parseInt(newProduct.price),
      weight: parseFloat(newProduct.weight)
    };

    setProducts([...products, product]);
    setNewProduct({ 
      name: '', 
      description: '', 
      category: 'corporate', 
      price: '', 
      weight: '', 
      colors: '', 
      sizeModEnabled: false, 
      sizes: '',
      image: null,
      imagePreview: ''
    });
    setActiveTab('products');
  };

  const handleCreateCategory = () => {
    if (!newCategory.name) {
      alert('Category name is required');
      return;
    }

    const categoryId = `CAT${String(categories.length + 1).padStart(3, '0')}`;
    const category = {
      ...newCategory,
      id: categoryId,
      productCount: 0
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '', active: true });
  };

  const handleCreateCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert('Name and email are required');
      return;
    }

    const customerId = `CUST${String(customers.length + 1).padStart(3, '0')}`;
    const customer = {
      ...newCustomer,
      id: customerId,
      lastVisit: new Date().toISOString().split('T')[0],
      lastPurchase: null,
      totalSpent: 0,
      orders: 0
    };

    setCustomers([...customers, customer]);
    setNewCustomer({ name: '', email: '', phone: '', category: 'corporate' });
  };

  const handleCreateAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      alert('Name and email are required');
      return;
    }

    const adminId = `ADM${String(adminUsers.length + 1).padStart(3, '0')}`;
    const admin = {
      ...newAdmin,
      id: adminId,
      lastLogin: null,
      active: true
    };

    setAdminUsers([...adminUsers, admin]);
    setNewAdmin({ name: '', email: '', role: 'Sales', permissions: [] });
  };

  const handleLogSale = () => {
    if (!newSale.productId || !newSale.quantity || !newSale.size) {
      alert('Please fill all fields');
      return;
    }

    const product = products.find(p => p.id === newSale.productId);
    if (product && product.stock >= parseInt(newSale.quantity)) {
      // Update stock
      setProducts(products.map(p => 
        p.id === newSale.productId ? { ...p, stock: p.stock - parseInt(newSale.quantity) } : p
      ));
      
      // Create new order
      const orderId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
      const newOrder = {
        id: orderId,
        customerId: 'CUST001', // Default customer for logged sales
        productId: newSale.productId,
        quantity: parseInt(newSale.quantity),
        amount: product.price * parseInt(newSale.quantity),
        size: newSale.size,
        sizeModification: product.sizeModEnabled ? 'Yes' : 'No',
        deliveryStatus: 'Completed',
        paymentChannel: 'Cash',
        date: new Date().toISOString().split('T')[0]
      };
      
      setOrders([...orders, newOrder]);
      setNewSale({ productId: '', quantity: '', size: '' });
      alert('Sale logged successfully!');
    } else {
      alert('Insufficient stock or invalid product!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // router.push('/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-[#5a6b61]">{products.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Total Customers</h3>
                <p className="text-3xl font-bold text-[#a8b1ac]">{customers.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-[#5a6b61]">{orders.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-[#a8b1ac]">₦{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
            
            {/* Revenue Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-2xl font-bold">₦{monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Top Selling Product</h3>
                {topSellingProduct.name ? (
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      {topSellingProduct.image ? (
                        <img src={topSellingProduct.image} alt={topSellingProduct.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Package size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold">{topSellingProduct.name}</h4>
                      <p>Total Sold: {topSellingProduct.totalSold || 0}</p>
                      <p>Revenue: ₦{(topSellingProduct.price * (topSellingProduct.totalSold || 0)).toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <p>No sales data available</p>
                )}
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3">Order ID</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Amount</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-mono">{order.id}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">₦{order.amount.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.deliveryStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Products</h1>
              <button 
                onClick={() => setActiveTab('create-product')}
                className="bg-[#5a6b61] text-white px-4 py-2 rounded-lg hover:bg-[#495a51] flex items-center gap-2"
              >
                <Plus size={20} /> Add Product
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-lg pl-10 pr-4 py-2 w-full"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                <option value="all">All Categories</option>
                <option value="corporate">Corporate</option>
                <option value="traditional">Traditional</option>
                <option value="casual">Casual</option>
              </select>
            </div>
            
            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={16} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 capitalize">{product.category}</td>
                      <td className="p-4">₦{product.price?.toLocaleString()}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.stock > 5 ? 'bg-green-100 text-green-800' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 5 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setNewProduct({
                                ...product,
                                colors: product.colors.join(', '),
                                sizes: product.sizes.join(', '),
                                imagePreview: product.image || ''
                              });
                              setActiveTab('create-product');
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'create-product':
        return (
          <div className="space-y-6 animate-in slide-in-from-left duration-500">
            <h1 className="text-3xl font-bold">
              {newProduct.id ? 'Edit Product' : 'Create New Product'}
            </h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Name*</label>
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="border rounded-lg p-3 w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category*</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="border rounded-lg p-3 w-full"
                    >
                      <option value="corporate">Corporate</option>
                      <option value="traditional">Traditional</option>
                      <option value="casual">Casual</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (₦)*</label>
                    <input
                      type="number"
                      placeholder="Price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="border rounded-lg p-3 w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Weight"
                      value={newProduct.weight}
                      onChange={(e) => setNewProduct({...newProduct, weight: e.target.value})}
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Image</label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border">
                        {newProduct.imagePreview ? (
                          <img src={newProduct.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <span className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
                          Upload Image
                        </span>
                        <input 
                          type="file" 
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Colors*</label>
                    <input
                      type="text"
                      placeholder="Comma separated colors (Black, Navy, etc)"
                      value={newProduct.colors}
                      onChange={(e) => setNewProduct({...newProduct, colors: e.target.value})}
                      className="border rounded-lg p-3 w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Available Sizes*</label>
                    <input
                      type="text"
                      placeholder="Comma separated sizes (S, M, L, XL)"
                      value={newProduct.sizes}
                      onChange={(e) => setNewProduct({...newProduct, sizes: e.target.value})}
                      className="border rounded-lg p-3 w-full"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newProduct.sizeModEnabled}
                      onChange={(e) => setNewProduct({...newProduct, sizeModEnabled: e.target.checked})}
                      className="mr-2"
                      id="sizeModEnabled"
                    />
                    <label htmlFor="sizeModEnabled">Enable Size Modifications</label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium mb-1">Description*</label>
                <textarea
                  placeholder="Product description..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="border rounded-lg p-3 w-full"
                  rows="4"
                  required
                />
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-6 py-3 rounded-lg border hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProduct}
                  className="bg-[#5a6b61] text-white px-6 py-3 rounded-lg hover:bg-[#495a51]"
                >
                  {newProduct.id ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </div>
          </div>
        );

     case 'categories':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Categories</h1>
              <button 
                onClick={() => setActiveTab('create-category')}
                className="bg-[#5a6b61] text-white px-4 py-2 rounded-lg hover:bg-[#495a51] flex items-center gap-2"
              >
                <Plus size={20} /> Add Category
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Description</th>
                    <th className="text-left p-4">Products</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-medium">{category.name}</td>
                      <td className="p-4 text-gray-600">{category.description}</td>
                      <td className="p-4">{category.productCount}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {category.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                          <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'create-category':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create New Category</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl">
              <div className="space-y-4">
                <input type="text" placeholder="Category Name" value={newCategory.name} onChange={(e) => setNewCategory({...newCategory, name: e.target.value})} className="border rounded-lg p-3 w-full" />
                <textarea placeholder="Category Description" value={newCategory.description} onChange={(e) => setNewCategory({...newCategory, description: e.target.value})} className="border rounded-lg p-3 w-full" rows="3" />
                <div className="flex items-center">
                  <input type="checkbox" checked={newCategory.active} onChange={(e) => setNewCategory({...newCategory, active: e.target.checked})} className="mr-2" />
                  <label>Active</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setActiveTab('categories')} className="px-6 py-3 rounded-lg border hover:bg-gray-50">Cancel</button>
                <button onClick={handleCreateCategory} className="bg-[#5a6b61] text-white px-6 py-3 rounded-lg hover:bg-[#495a51]">Create Category</button>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Orders</h1>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Order ID</th>
                    <th className="text-left p-4">Customer</th>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const customer = customers.find(c => c.id === order.customerId);
                    const product = products.find(p => p.id === order.productId);
                    return (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-mono">{order.id}</td>
                        <td className="p-4">{customer?.name}</td>
                        <td className="p-4">{product?.name}</td>
                        <td className="p-4">₦{order.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.deliveryStatus}
                          </span>
                        </td>
                        <td className="p-4">{order.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Customers</h1>
              <button onClick={() => setActiveTab('create-customer')} className="bg-[#5a6b61] text-white px-4 py-2 rounded-lg hover:bg-[#495a51] flex items-center gap-2">
                <UserPlus size={20} /> Add Customer
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Phone</th>
                    <th className="text-left p-4">Orders</th>
                    <th className="text-left p-4">Total Spent</th>
                    <th className="text-left p-4">Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-medium">{customer.name}</td>
                      <td className="p-4">{customer.email}</td>
                      <td className="p-4">{customer.phone}</td>
                      <td className="p-4">{customer.orders}</td>
                      <td className="p-4">₦{customer.totalSpent.toLocaleString()}</td>
                      <td className="p-4">{customer.lastVisit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'create-customer':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Add New Customer</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl">
              <div className="space-y-4">
                <input type="text" placeholder="Customer Name" value={newCustomer.name} onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} className="border rounded-lg p-3 w-full" />
                <input type="email" placeholder="Email" value={newCustomer.email} onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} className="border rounded-lg p-3 w-full" />
                <input type="tel" placeholder="Phone" value={newCustomer.phone} onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})} className="border rounded-lg p-3 w-full" />
                <select value={newCustomer.category} onChange={(e) => setNewCustomer({...newCustomer, category: e.target.value})} className="border rounded-lg p-3 w-full">
                  <option value="corporate">Corporate</option>
                  <option value="traditional">Traditional</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setActiveTab('customers')} className="px-6 py-3 rounded-lg border hover:bg-gray-50">Cancel</button>
                <button onClick={handleCreateCustomer} className="bg-[#5a6b61] text-white px-6 py-3 rounded-lg hover:bg-[#495a51]">Add Customer</button>
              </div>
            </div>
          </div>
        );

      case 'log-sale':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Log Sale</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl">
              <div className="space-y-4">
                <select value={newSale.productId} onChange={(e) => setNewSale({...newSale, productId: e.target.value})} className="border rounded-lg p-3 w-full">
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name} (Stock: {product.stock})</option>
                  ))}
                </select>
                <input type="number" placeholder="Quantity" value={newSale.quantity} onChange={(e) => setNewSale({...newSale, quantity: e.target.value})} className="border rounded-lg p-3 w-full" />
                <input type="text" placeholder="Size" value={newSale.size} onChange={(e) => setNewSale({...newSale, size: e.target.value})} className="border rounded-lg p-3 w-full" />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setActiveTab('dashboard')} className="px-6 py-3 rounded-lg border hover:bg-gray-50">Cancel</button>
                <button onClick={handleLogSale} className="bg-[#5a6b61] text-white px-6 py-3 rounded-lg hover:bg-[#495a51]">Log Sale</button>
              </div>
            </div>
          </div>
        );

      case 'admin-users':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Admin Users</h1>
              <button onClick={() => setActiveTab('create-admin')} className="bg-[#5a6b61] text-white px-4 py-2 rounded-lg hover:bg-[#495a51] flex items-center gap-2">
                <UserPlus size={20} /> Add Admin
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Last Login</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map(admin => (
                    <tr key={admin.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-medium">{admin.name}</td>
                      <td className="p-4">{admin.email}</td>
                      <td className="p-4">{admin.role}</td>
                      <td className="p-4">{admin.lastLogin || 'Never'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${admin.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {admin.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                          <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'create-admin':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Add New Admin</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl">
              <div className="space-y-4">
                <input type="text" placeholder="Admin Name" value={newAdmin.name} onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})} className="border rounded-lg p-3 w-full" />
                <input type="email" placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})} className="border rounded-lg p-3 w-full" />
                <select value={newAdmin.role} onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})} className="border rounded-lg p-3 w-full">
                  <option value="Sales">Sales</option>
                  <option value="Manager">Manager</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setActiveTab('admin-users')} className="px-6 py-3 rounded-lg border hover:bg-gray-50">Cancel</button>
                <button onClick={handleCreateAdmin} className="bg-[#5a6b61] text-white px-6 py-3 rounded-lg hover:bg-[#495a51]">Add Admin</button>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-center py-12"><h2 className="text-2xl">Section under development</h2></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-[#5a6b61]">Marobi Admin</h2>
        </div>
        <nav className="mt-6">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                activeTab === item.key ? 'bg-[#5a6b61] text-white' : 'text-gray-700'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-red-600 hover:text-red-800">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
