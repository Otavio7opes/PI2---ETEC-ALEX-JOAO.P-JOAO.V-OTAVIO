import React, { useState } from 'react'
import Button from '../components/Button/Button'
import { User } from '../types/user'
import { InventoryItem } from '../types/inventory'
import { mockUsers, mockInventory } from '../data/mockData'
import './AdminDashboard.css'

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'inventory' | 'reports'>('users')
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)

  const handleToggleUserActive = (userId: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    )
  }

  const handleUpdateInventory = (itemId: string, newQuantity: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="page-title">
        <h1>Painel Administrativo</h1>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Usuários
        </button>
        <button
          className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Estoque
        </button>
        <button
          className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Relatórios
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>Gerenciamento de Usuários</h2>
              <Button variant="primary" size="small">
                Adicionar Usuário
              </Button>
            </div>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Função</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="role-badge role-{user.role}">
                          {user.role === 'teacher' && 'Professor'}
                          {user.role === 'lab_technician' && 'Técnico'}
                          {user.role === 'admin' && 'Administrador'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>
                          {user.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-action"
                          onClick={() => handleToggleUserActive(user.id)}
                        >
                          {user.active ? 'Desativar' : 'Ativar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="inventory-section">
            <div className="section-header">
              <h2>Controle de Estoque</h2>
              <Button variant="primary" size="small">
                Adicionar Item
              </Button>
            </div>
            <div className="inventory-grid">
              {inventory.map((item) => (
                <div key={item.id} className="inventory-card">
                  <div className="inventory-card-header">
                    <h3>{item.name}</h3>
                    <span className={`category-badge category-${item.category}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="inventory-card-body">
                    <div className="inventory-info">
                      <div className="info-item">
                        <span className="info-label">Quantidade:</span>
                        <span className={`info-value ${item.quantity < item.minQuantity ? 'low-stock' : ''}`}>
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Mínimo:</span>
                        <span className="info-value">{item.minQuantity} {item.unit}</span>
                      </div>
                      {item.location && (
                        <div className="info-item">
                          <span className="info-label">Localização:</span>
                          <span className="info-value">{item.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="inventory-actions">
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateInventory(item.id, parseInt(e.target.value) || 0)
                        }
                        min="0"
                      />
                      <Button variant="secondary" size="small">
                        Atualizar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-section">
            <div className="section-header">
              <h2>Relatórios</h2>
            </div>
            <div className="reports-grid">
              <div className="report-card">
                <h3>Uso de Laboratórios</h3>
                <p>Relatório de utilização dos laboratórios por período</p>
                <Button variant="secondary" size="medium">
                  Gerar Relatório
                </Button>
              </div>
              <div className="report-card">
                <h3>Material Utilizado</h3>
                <p>Relatório de materiais e reagentes utilizados</p>
                <Button variant="secondary" size="medium">
                  Gerar Relatório
                </Button>
              </div>
              <div className="report-card">
                <h3>Perdas e Quebras</h3>
                <p>Relatório de perdas e quebras de materiais</p>
                <Button variant="secondary" size="medium">
                  Gerar Relatório
                </Button>
              </div>
              <div className="report-card">
                <h3>Estoque Crítico</h3>
                <p>Itens com estoque abaixo do mínimo</p>
                <Button variant="secondary" size="medium">
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

