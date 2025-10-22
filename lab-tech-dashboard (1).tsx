import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const LabTechDashboard = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      professor: 'Prof. Ana Silva',
      date: '23/08/2025',
      time: '10:00 - 12:00',
      lab: 'Laboratorio 3',
      materials: [
        { id: 1, name: 'Bequer 50 ml', checked: false },
        { id: 2, name: 'Acido cloridrico', checked: false },
        { id: 3, name: 'Pipeta', checked: false },
        { id: 4, name: 'Erlenmyer 250ml', checked: false }
      ],
      confirmed: false,
      hasIssue: false
    },
    {
      id: 2,
      professor: 'Prof. Ana Silva',
      date: '23/08/2025',
      time: '10:00 - 12:00',
      lab: 'Laboratorio 3',
      materials: [
        { id: 5, name: 'Bequer 50 ml', checked: false },
        { id: 6, name: 'Acido cloridrico', checked: false },
        { id: 7, name: 'Pipeta', checked: false },
        { id: 8, name: 'Erlenmyer 250ml', checked: false }
      ],
      confirmed: false,
      hasIssue: false
    },
    {
      id: 3,
      professor: 'Prof. Ana Silva',
      date: '23/08/2025',
      time: '10:00 - 12:00',
      lab: 'Laboratorio 3',
      materials: [
        { id: 9, name: 'Bequer 50 ml', checked: false },
        { id: 10, name: 'Acido cloridrico', checked: false },
        { id: 11, name: 'Pipeta', checked: false },
        { id: 12, name: 'Erlenmyer 250ml', checked: false }
      ],
      confirmed: false,
      hasIssue: false
    }
  ]);

  const toggleMaterial = (bookingId, materialId) => {
    setBookings(bookings.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          materials: booking.materials.map(mat =>
            mat.id === materialId ? { ...mat, checked: !mat.checked } : mat
          )
        };
      }
      return booking;
    }));
  };

  const confirmPreparation = (bookingId) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, confirmed: true } : booking
    ));
  };

  const reportIssue = (bookingId) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, hasIssue: true } : booking
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Verdana, sans-serif' }}>
                Etec
              </div>
              <div className="text-xs text-gray-600" style={{ fontFamily: 'Verdana, sans-serif' }}>
                Julio de<br/>Mesquita<br/>Santo Andre
              </div>
            </div>
            <div className="w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#B20000"/>
                <text x="50" y="60" fontSize="40" fill="white" textAnchor="middle" fontWeight="bold" fontFamily="Verdana">CPS</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-red-700 h-20"></div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-300 rounded-lg py-4 mb-8">
          <h1 className="text-center text-2xl font-bold text-gray-800" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Laboratorios Reservados
          </h1>
        </div>

        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-800" style={{ fontFamily: 'Verdana, sans-serif' }}>
                    {booking.professor}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Verdana, sans-serif' }}>
                    {booking.date}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Verdana, sans-serif' }}>
                    {booking.time}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Verdana, sans-serif' }}>
                    {booking.lab}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-3">
                    {booking.materials.map(material => (
                      <label 
                        key={material.id} 
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={material.checked}
                          onChange={() => toggleMaterial(booking.id, material.id)}
                          className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700" style={{ fontFamily: 'Verdana, sans-serif' }}>
                          {material.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => confirmPreparation(booking.id)}
                  disabled={booking.confirmed}
                  className={`flex-1 px-4 py-2 rounded font-medium transition-colors ${
                    booking.confirmed
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                  style={{ fontFamily: 'Verdana, sans-serif' }}
                >
                  {booking.confirmed ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle size={18} />
                      Preparacao Confirmada
                    </span>
                  ) : (
                    'Confirmar Separacao'
                  )}
                </button>
                <button
                  onClick={() => reportIssue(booking.id)}
                  disabled={booking.hasIssue}
                  className={`flex-1 px-4 py-2 rounded font-medium transition-colors ${
                    booking.hasIssue
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-400 text-white hover:bg-gray-500'
                  }`}
                  style={{ fontFamily: 'Verdana, sans-serif' }}
                >
                  {booking.hasIssue ? (
                    <span className="flex items-center justify-center gap-2">
                      <AlertCircle size={18} />
                      Problema Reportado
                    </span>
                  ) : (
                    'Relatar Perda/Quebra'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="px-8 py-3 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition-colors shadow-lg"
            style={{ fontFamily: 'Verdana, sans-serif' }}
          >
            Ajustar Estoque
          </button>
        </div>
      </main>

      <footer className="bg-teal-800 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-white text-sm" style={{ fontFamily: 'Verdana, sans-serif' }}>
          2024 Etec Julio de Mesquita - Centro Paula Souza
        </div>
      </footer>
    </div>
  );
};

export default LabTechDashboard;