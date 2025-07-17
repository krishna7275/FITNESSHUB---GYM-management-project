document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
        // Redirect to login page if not logged in
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Sample data - in a real application, this would come from a database
    let members = [
        { id: 1, name: 'Kamal Sheikh', email: 'shaik@email.com', phone: '9192351111', membership: 'Premium', joinDate: '2025-01-15' },
        { id: 2, name: 'Sarah Madela', email: 'sarah@email.com', phone: '9876543210', membership: 'Standard', joinDate: '2025-02-22' },
        { id: 3, name: 'Robert Bareto', email: 'robert@email.com', phone: '1234567890', membership: 'Basic', joinDate: '2025-03-10' },
        { id: 4, name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '9876543210', membership: 'Premium', joinDate: '2024-12-15' },
        { id: 5, name: 'Priya Desai', email: 'pdesai@email.com', phone: '9823456789', membership: 'Standard', joinDate: '2024-11-10' },
        { id: 6, name: 'Aman Verma', email: 'aman@email.com', phone: '9898765432', membership: 'Basic', joinDate: '2024-10-05' },
        { id: 7, name: 'Sneha Patil', email: 'sneha@email.com', phone: '9876501234', membership: 'Premium', joinDate: '2024-09-18' },
        { id: 8, name: 'Arjun Singh', email: 'singh@email.com', phone: '9812345678', membership: 'Standard', joinDate: '2024-08-25' },
        { id: 9, name: 'Neha Gupta', email: 'neha@email.com', phone: '9887654321', membership: 'Basic', joinDate: '2024-07-10' },
        { id: 10, name: 'Rohan Iyer', email: 'iyer@email.com', phone: '9823456123', membership: 'Premium', joinDate: '2024-06-15' },
        { id: 11, name: 'Pooja Choudary', email: 'poojac@email.com', phone: '9786543210', membership: 'Standard', joinDate: '2024-05-30' },
        { id: 12, name: 'Karan Mehta', email: 'karan@email.com', phone: '981122334', membership: 'Basic', joinDate: '2024-04-05' },
        { id: 13, name: 'Swati Kulkarni', email: 'swati@email.com', phone: '9876547890', membership: 'Premium', joinDate: '2024-03-12' },
        { id: 14, name: 'Manish Tiwari', email: 'tiwari@email.com', phone: '9900123456', membership: 'Basic', joinDate: '2024-02-22' },
        { id: 15, name: 'Ananya Reddy', email: 'areddy@email.com', phone: '9876098765', membership: 'Standard', joinDate: '2024-01-18' },
        { id: 16, name: 'Vishal Dubey', email: 'dubey@email.com', phone: '9812340987', membership: 'Standard', joinDate: '2023-12-10' },
        { id: 17, name: 'Kavita Nair', email: 'kavita@email.com', phone: '9823098765', membership: 'Basic', joinDate: '2023-11-05' },
        { id: 18, name: 'Sandeep Joshi', email: 'sandeepj@email.com', phone: '9786543210', membership: 'Standard', joinDate: '2023-10-15' },
        { id: 19, name: 'Ritika Malhotra', email: 'rmalhotra@email.com', phone: '9786543210', membership: 'Standard', joinDate: '2023-09-30' },
        { id: 20, name: 'Harsh Vardhan', email: 'harsh@email.com', phone: '9786543210', membership: 'Standard', joinDate: '2023-08-25' },
        { id: 21, name: 'Meenal Saxena', email: 'saxena@email.com', phone: '9786543210', membership: 'Standard', joinDate: '2023-07-20' }
    ];
    
    let memberships = [
        { id: 1, name: 'Basic', duration: '1 Month', price: 599, features: 'Gym access', activeMembers: 7 },
        { id: 2, name: 'Standard', duration: '3 Months', price: 799, features: 'Gym access, 1 class/week', activeMembers: 5 },
        { id: 3, name: 'Premium', duration: '12 Months', price: 1199, features: 'Gym access, unlimited classes, trainer', activeMembers: 7 }
    ];
    

    // Tab switching functionality
    const tabs = document.querySelectorAll('.sidebar li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show correct content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Load members table
    function loadMembersTable() {
        const tableBody = document.querySelector('#membersTable tbody');
        tableBody.innerHTML = '';
        
        members.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.id}</td>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${member.membership}</td>
                <td>${member.joinDate}</td>
                <td>
                    <button class="edit-btn" data-id="${member.id}">Edit</button>
                    <button class="delete-btn" data-id="${member.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const memberId = parseInt(btn.getAttribute('data-id'));
                openMemberModal(memberId);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const memberId = parseInt(btn.getAttribute('data-id'));
                deleteMember(memberId);
            });
        });
    }
    
    // Load memberships table
    function loadMembershipsTable() {
        const tableBody = document.querySelector('#membershipsTable tbody');
        tableBody.innerHTML = '';
        
        [
            { id: 1, name: 'Basic', duration: '1 Month', price: 599, features: 'Gym access', activeMembers: 7 },
            { id: 2, name: 'Standard', duration: '3 Months', price: 799, features: 'Gym access, 1 class/week', activeMembers: 5 },
            { id: 3, name: 'Premium', duration: '12 Months', price: 1199, features: 'Gym access, unlimited classes, trainer', activeMembers: 7 }
        ].forEach(membership => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${membership.id}</td>
                <td>${membership.name}</td>
                <td>${membership.duration}</td>
                <td>$${membership.price}</td>
                <td>${membership.features}</td>
                <td>${membership.activeMembers}</td>
                <td>
                    <button class="edit-btn" data-id="${membership.id}">Edit</button>
                    <button class="delete-btn" data-id="${membership.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Load membership options in member form
    function loadMembershipOptions() {
        const select = document.getElementById('membershipType');
        select.innerHTML = '';
        
        [
            { id: 1, name: 'Basic', duration: '1 Month', price: 599, features: 'Gym access', activeMembers: 7 },
            { id: 2, name: 'Standard', duration: '3 Months', price: 799, features: 'Gym access, 1 class/week', activeMembers: 5 },
            { id: 3, name: 'Premium', duration: '12 Months', price: 1199, features: 'Gym access, unlimited classes, trainer', activeMembers: 7 }
        ].forEach(membership => {
            const option = document.createElement('option');
            option.value = membership.name;
            option.textContent = membership.name;
            select.appendChild(option);
        });
    }
    
    // Load statistics
    function loadStatistics() {
        document.getElementById('totalMembers').textContent = members.length;
        
        const activeMembers = [
            { id: 1, name: 'Basic', duration: '1 Month', price: 599, features: 'Gym access', activeMembers: 7 },
            { id: 2, name: 'Standard', duration: '3 Months', price: 799, features: 'Gym access, 1 class/week', activeMembers: 5 },
            { id: 3, name: 'Premium', duration: '12 Months', price: 1199, features: 'Gym access, unlimited classes, trainer', activeMembers: 7 }
        ].reduce((sum, membership) => sum + membership.activeMembers, 0);
        document.getElementById('activeMembers').textContent = activeMembers;
        
        const monthlyRevenue = [
            { id: 1, name: 'Basic', duration: '1 Month', price: 599, features: 'Gym access', activeMembers: 7 },
            { id: 2, name: 'Standard', duration: '3 Months', price: 799, features: 'Gym access, 1 class/week', activeMembers: 5 },
            { id: 3, name: 'Premium', duration: '12 Months', price: 1199, features: 'Gym access, unlimited classes, trainer', activeMembers: 7 }
        ].reduce((sum, membership) => {
            // Simple calculation, not accounting for different durations
            return sum + (membership.activeMembers * (membership.price / parseInt(membership.duration)));
        }, 0);
        document.getElementById('monthlyRevenue').textContent = '' + monthlyRevenue.toFixed(2);
        
    
        const chartContainer = document.getElementById('membershipChart');
        chartContainer.innerHTML = '';
        
        const chartDiv = document.createElement('div');
        chartDiv.style.display = 'flex';
        chartDiv.style.height = '100%';
        chartDiv.style.alignItems = 'flex-end';
        chartDiv.style.gap = '30px';
        chartDiv.style.padding = '20px 0';
        
        [
            { id: 1, name: 'Basic', duration: '1 Month', price: 599, features: 'Gym access', activeMembers: 7 },
            { id: 2, name: 'Standard', duration: '3 Months', price: 799, features: 'Gym access, 1 class/week', activeMembers: 5 },
            { id: 3, name: 'Premium', duration: '12 Months', price: 1199, features: 'Gym access, unlimited classes, trainer', activeMembers: 7 }
        ].forEach(membership => {
            const bar = document.createElement('div');
            const height = (membership.activeMembers / activeMembers) * 200;
            
            bar.style.width = '80px';
            bar.style.height = `${height}px`;
            bar.style.backgroundColor = '#e63946';
            bar.style.position = 'relative';
            bar.style.borderRadius = '5px 5px 0 0';
            
            const label = document.createElement('div');
            label.textContent = membership.name;
            label.style.position = 'absolute';
            label.style.bottom = '-25px';
            label.style.textAlign = 'center';
            label.style.width = '100%';
            
            const value = document.createElement('div');
            value.textContent = membership.activeMembers;
            value.style.position = 'absolute';
            value.style.top = '-25px';
            value.style.textAlign = 'center';
            value.style.width = '100%';
            value.style.fontWeight = 'bold';
            
            bar.appendChild(label);
            bar.appendChild(value);
            chartDiv.appendChild(bar);
        });
        
        chartContainer.appendChild(chartDiv);
    }
    
    // Member modal functionality
    const memberModal = document.getElementById('memberModal');
    const modalTitle = document.getElementById('modalTitle');
    const memberForm = document.getElementById('memberForm');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    // Open modal for adding or editing a member
    function openMemberModal(memberId = null) {
        loadMembershipOptions();
        
        if (memberId) {
            // Edit existing member
            const member = members.find(m => m.id === memberId);
            if (member) {
                modalTitle.textContent = 'Edit Member';
                document.getElementById('memberId').value = member.id;
                document.getElementById('memberName').value = member.name;
                document.getElementById('memberEmail').value = member.email;
                document.getElementById('memberPhone').value = member.phone;
                document.getElementById('membershipType').value = member.membership;
            }
        } else {
            // Add new member
            modalTitle.textContent = 'Add New Member';
            memberForm.reset();
            document.getElementById('memberId').value = '';
        }
        
        memberModal.style.display = 'block';
    }
    
    // Close modal
    function closeModal() {
        memberModal.style.display = 'none';
    }
    
    // Add new member button
    document.getElementById('addMemberBtn').addEventListener('click', () => {
        openMemberModal();
    });
    
    // Close modal buttons
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Save member form submission
    memberForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const memberId = document.getElementById('memberId').value;
        const name = document.getElementById('memberName').value;
        const email = document.getElementById('memberEmail').value;
        const phone = document.getElementById('memberPhone').value;
        const membership = document.getElementById('membershipType').value;
        
        if (memberId) {
            // Update existing member
            const index = members.findIndex(m => m.id === parseInt(memberId));
            if (index !== -1) {
                members[index] = {
                    ...members[index],
                    name,
                    email,
                    phone,
                    membership
                };
            }
        } else {
            // Add new member
            const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
            const today = new Date().toISOString().split('T')[0];
            
            members.push({
                id: newId,
                name,
                email,
                phone,
                membership,
                joinDate: today
            });
        }
        
        loadMembersTable();
        loadStatistics();
        closeModal();
    });
    
    // Delete member
    function deleteMember(id) {
        if (confirm('Are you sure you want to delete this member?')) {
            members = members.filter(member => member.id !== id);
            loadMembersTable();
            loadStatistics();
        }
    }
    
    // Search functionality
    document.getElementById('memberSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMembers = members.filter(member => 
            member.name.toLowerCase().includes(searchTerm) || 
            member.email.toLowerCase().includes(searchTerm) || 
            member.phone.includes(searchTerm)
        );
        
        const tableBody = document.querySelector('#membersTable tbody');
        tableBody.innerHTML = '';
        
        filteredMembers.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.id}</td>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${member.membership}</td>
                <td>${member.joinDate}</td>
                <td>
                    <button class="edit-btn" data-id="${member.id}">Edit</button>
                    <button class="delete-btn" data-id="${member.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'index.html';
    });
    
    // Initialize tables and statistics
    loadMembersTable();
    loadMembershipsTable();
    loadStatistics();
});