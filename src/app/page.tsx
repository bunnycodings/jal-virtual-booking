import Layout from '@/components/Layout'

export default function HomePage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to JAL Virtual</h1>
          <p className="text-gray-400 text-lg">Book your virtual flights and manage your aviation experience</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Active Events</h3>
            <p className="text-3xl font-bold text-blue-400">12</p>
            <p className="text-sm text-gray-400">Available for booking</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">My Bookings</h3>
            <p className="text-3xl font-bold text-green-400">5</p>
            <p className="text-sm text-gray-400">Confirmed flights</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Flight Hours</h3>
            <p className="text-3xl font-bold text-yellow-400">127</p>
            <p className="text-sm text-gray-400">Total logged</p>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Events</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-white">Tokyo to Osaka Express</h3>
              <p className="text-gray-400">December 15, 2024 • RJTT → RJOO</p>
              <p className="text-sm text-gray-500">Boeing 737-800 • 45 slots available</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-white">International Route</h3>
              <p className="text-gray-400">December 20, 2024 • RJTT → KLAX</p>
              <p className="text-sm text-gray-500">Boeing 777-300ER • 12 slots available</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-semibold text-white">Regional Flight</h3>
              <p className="text-gray-400">December 25, 2024 • RJTT → RJCC</p>
              <p className="text-sm text-gray-500">Airbus A320 • 28 slots available</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}