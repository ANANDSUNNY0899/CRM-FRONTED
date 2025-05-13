import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CampaignHistory() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    setCampaigns([
      {
        id: 1,
        name: "Campaign 1",
        audienceSize: 500,
        deliveryStatus: "Sent",
        date: "2025-05-01",
      },
      {
        id: 2,
        name: "Campaign 2",
        audienceSize: 1000,
        deliveryStatus: "Failed",
        date: "2025-04-25",
      },
    ]);
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Campaign History</h2>
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{campaign.name}</h3>
            <p>Audience Size: {campaign.audienceSize}</p>
            <p>Delivery Status: {campaign.deliveryStatus}</p>
            <p>Date: {campaign.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
