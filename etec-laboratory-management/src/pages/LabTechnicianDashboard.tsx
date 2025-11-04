import React, { useState } from 'react'
import ReservationCard from '../components/ReservationCard/ReservationCard'
import Button from '../components/Button/Button'
import { Reservation } from '../types/reservation'
import { mockReservations } from '../data/mockData'
import './LabTechnicianDashboard.css'

const LabTechnicianDashboard: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)

  const handleConfirmSeparation = (id: string) => {
    setReservations(prev =>
      prev.map(res =>
        res.id === id ? { ...res, confirmed: true } : res
      )
    )
    alert('Separação confirmada com sucesso!')
  }

  const handleReportLoss = (id: string) => {
    const reservation = reservations.find(r => r.id === id)
    if (reservation) {
      const lossReport = prompt(
        `Relatar perda/quebra para ${reservation.professor}:\n\nDescreva o item e o problema:`
      )
      if (lossReport) {
        alert('Perda/quebra registrada com sucesso!')
      }
    }
  }

  const handleToggleMaterial = (reservationId: string, materialId: string) => {
    setReservations(prev =>
      prev.map(res =>
        res.id === reservationId
          ? {
              ...res,
              materials: res.materials.map(mat =>
                mat.id === materialId
                  ? { ...mat, checked: !mat.checked }
                  : mat
              ),
            }
          : res
      )
    )
  }

  const handleAdjustStock = () => {
    alert('Redirecionando para ajuste de estoque...')
    // Navigation would be handled by router
  }

  return (
    <div className="lab-technician-dashboard">
      <div className="page-title">
        <h1>Laboratorios Reservados</h1>
      </div>

      <div className="reservations-list">
        {reservations.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma reserva encontrada.</p>
          </div>
        ) : (
          reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onConfirmSeparation={handleConfirmSeparation}
              onReportLoss={handleReportLoss}
              onToggleMaterial={handleToggleMaterial}
            />
          ))
        )}
      </div>

      <div className="dashboard-actions">
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleAdjustStock}
        >
          Ajustar Estoque
        </Button>
      </div>
    </div>
  )
}

export default LabTechnicianDashboard

