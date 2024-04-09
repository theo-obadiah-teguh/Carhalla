import { useLocation } from 'react-router-dom';
import HomeNavbar from "../Home/HomeNavBar";

const ViewReservations = () => {
    const location = useLocation();
    const plateNumber = location.state?.plateNumber;

    const reservations = [
        { reservationNumber: 'R001', hourlyRate: 10, date: '2022-01-01', branch: 'Branch A' },
        { reservationNumber: 'R002', hourlyRate: 12, date: '2022-01-02', branch: 'Branch B' },
        { reservationNumber: 'R003', hourlyRate: 15, date: '2022-01-03', branch: 'Branch A' },
        { reservationNumber: 'R004', hourlyRate: 10, date: '2022-01-04', branch: 'Branch C' },
        { reservationNumber: 'R005', hourlyRate: 12, date: '2022-01-05', branch: 'Branch B' },
        { reservationNumber: 'R006', hourlyRate: 15, date: '2022-01-06', branch: 'Branch A' },
    ];

    return (
        <div className="ViewRes">
            <HomeNavbar sticky = "top" exact/>
            <h2 className="m-5" style={{color: "black", fontWeight: "bold"}}> Reservations for {plateNumber} </h2>
            <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
            <table className="table table-striped table-hover" style={{width: "90%", marginLeft: "5%", marginRight: "5%"}}>
                <thead>
                    <tr>
                        <th scope="col">Reservation Number</th>
                        <th scope="col">Hourly Rate</th>
                        <th scope="col">Date</th>
                        <th scope="col">Branch</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation.reservationNumber}>
                            <td>{reservation.reservationNumber}</td>
                            <td>{reservation.hourlyRate}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.branch}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default ViewReservations;