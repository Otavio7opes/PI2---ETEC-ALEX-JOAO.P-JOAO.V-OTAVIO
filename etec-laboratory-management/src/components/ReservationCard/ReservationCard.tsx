import React, { useState } from 'react'
import { Reservation } from '../../types/reservation'
import './ReservationCard.css'

interface ReservationCardProps {
  reservation: Reservation
  onConfirmSeparation: (id: string) => void
  onReportLoss: (id: string) => void
  onToggleMaterial: (reservationId: string, materialId: string) => void
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onConfirmSeparation,
  onReportLoss,
  onToggleMaterial,
}) => {
  const [materialStates, setMaterialStates] = useState<Record<string, boolean>>(
    reservation.materials.reduce((acc, material) => {
      acc[material.id] = material.checked || false
      return acc
    }, {} as Record<string, boolean>)
  )

  const handleMaterialToggle = (materialId: string) => {
    setMaterialStates(prev => ({
      ...prev,
      [materialId]: !prev[materialId],
    }))
    onToggleMaterial(reservation.id, materialId)
  }

  return (
    <div className="reservation-card">
      <div className="reservation-info">
        <div className="reservation-details">
          <div className="professor-name">{reservation.professor}</div>
          <div className="reservation-date">{reservation.date}</div>
          <div className="reservation-time">{reservation.time}</div>
          <div className="laboratory-name">{reservation.laboratory}</div>
        </div>
      </div>
      <div className="reservation-materials">
        <div className="materials-list">
          {reservation.materials.map((material) => (
            <label key={material.id} className="material-item">
              <input
                type="checkbox"
                checked={materialStates[material.id] || false}
                onChange={() => handleMaterialToggle(material.id)}
              />
              <span>{material.name}</span>
            </label>
          ))}
        </div>
        <div className="reservation-actions">
          <button
            className="btn-confirm"
            onClick={() => onConfirmSeparation(reservation.id)}
          >
            Confirmar Separação
          </button>
          <button
            className="btn-report"
            onClick={() => onReportLoss(reservation.id)}
          >
            Relatar Perda/Quebra
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReservationCard

