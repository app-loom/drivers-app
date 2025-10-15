
export const detailedMapStyle = [
  { featureType: "all", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "all", elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "labels.text", stylers: [{ visibility: "on" }] },
  { featureType: "poi", elementType: "all", stylers: [{ visibility: "on" }] },
  { featureType: "poi.business", elementType: "labels.text", stylers: [{ visibility: "on" }] },
  { featureType: "poi.park", elementType: "labels.text", stylers: [{ visibility: "on" }] },
  { featureType: "transit", elementType: "labels.text", stylers: [{ visibility: "on" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#e0e0e0" }] },
];

export const rideData = [
  {
    id: "1",
    from: "Chennai",
    to: "Coimbatore",
    date: "Oct 10, 2025",
    time: "06:45 AM",
    price: "₹950",
    status: "Completed",
  },
  {
    id: "2",
    from: "Madurai",
    to: "Trichy",
    date: "Oct 6, 2025",
    time: "03:30 PM",
    price: "₹420",
    status: "Completed",
  },
  {
    id: "3",
    from: "Salem",
    to: "Erode",
    date: "Oct 3, 2025",
    time: "09:00 AM",
    price: "₹250",
    status: "Cancelled",
  },
  {
    id: "4",
    from: "Tirunelveli",
    to: "Madurai",
    date: "Sep 28, 2025",
    time: "07:15 AM",
    price: "₹380",
    status: "Completed",
  },
  {
    id: "5",
    from: "Chennai",
    to: "Pondicherry",
    date: "Sep 20, 2025",
    time: "04:00 PM",
    price: "₹600",
    status: "Completed",
  },
];

export const user = {
  fullName: "Arun Kumar",
  mobileNumber: "+91 1234567890",
  email: "arun.kumar@example.com",
  gender: "Male",
  city: "Thanjavur",
  carNo: "TN49 AK 2345",
  carName: "Hyundai i20",
  profilePicture: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
  bankAccountDetails: "State Bank of India - ****2345",
  drivingLicence: "TN-DL-20394857",
  isVerified: true,
  regiStatus: "Active",
};

export const notificationsData = {
  today: [
    {
      id: "1",
      title: "New Ride Request",
      message: "You have a new ride request to Downtown.",
      time: "10:45 AM",
      icon: "car",
    },
    {
      id: "2",
      title: "Payment Received",
      message: "Your payment for the last ride was successful.",
      time: "8:12 AM",
      icon: "card",
    },
  ],
  yesterday: [
    {
      id: "3",
      title: "Ride Cancelled",
      message: "Your scheduled ride was cancelled by the driver.",
      time: "7:25 PM",
      icon: "close-circle",
    },
  ],
  earlier: [
    {
      id: "4",
      title: "Welcome!",
      message: "Thanks for joining our community. Enjoy safe rides!",
      time: "Oct 10",
      icon: "happy",
    },
  ],
};
