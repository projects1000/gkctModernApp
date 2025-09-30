import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import DataTable from '@/components/shared/DataTable';
import { PlusCircle, Search } from 'lucide-react';
import AddEditUserModal from '@/components/admin/AddEditUserModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('tms_users')) || [];
    setUsers(allUsers);
  }, []);

  const handleSaveUser = (userData) => {
    let updatedUsers;
    if (editingUser) {
      updatedUsers = users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u);
      toast({ title: "User Updated", description: `${userData.name} has been successfully updated.` });
    } else {
      const newUser = { ...userData, id: `user-${Date.now()}`, verified: true };
      updatedUsers = [...users, newUser];
      toast({ title: "User Added", description: `${userData.name} has been successfully added.` });
    }
    setUsers(updatedUsers);
    localStorage.setItem('tms_users', JSON.stringify(updatedUsers));
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const openDeleteConfirm = (userId) => {
    setDeletingUserId(userId);
    setIsAlertOpen(true);
  };

  const handleDeleteUser = () => {
    if (!deletingUserId) return;
    const userToDelete = users.find(u => u.id === deletingUserId);
    if (userToDelete.role === 'admin') {
      toast({ title: "Action Forbidden", description: "Cannot delete an admin user.", variant: "destructive" });
      setIsAlertOpen(false);
      return;
    }
    const updatedUsers = users.filter(u => u.id !== deletingUserId);
    setUsers(updatedUsers);
    localStorage.setItem('tms_users', JSON.stringify(updatedUsers));
    toast({ title: "User Deleted", description: "The user has been removed." });
    setIsAlertOpen(false);
    setDeletingUserId(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'verified', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const actions = [
    { label: 'Edit', onClick: (user) => { setEditingUser(user); setIsModalOpen(true); } },
    { label: 'Delete', onClick: (user) => openDeleteConfirm(user.id) },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => { setEditingUser(null); setIsModalOpen(true); }}>
            <PlusCircle className="w-5 h-5 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      <DataTable data={filteredUsers} columns={columns} actions={actions} />
      
      <AddEditUserModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
        onSave={handleSaveUser}
        user={editingUser}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;