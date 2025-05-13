import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CampaignCreation() {
  const [rules, setRules] = useState([{ field: "", operator: "", value: "" }]);
  const [audienceSize, setAudienceSize] = useState(null);
  const navigate = useNavigate();

  const handleAddRule = () => {
    setRules([...rules, { field: "", operator: "", value: "" }]);
  };

  const handleRemoveRule = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };

  const handleRuleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRules = [...rules];
    updatedRules[index][name] = value;
    setRules(updatedRules);
  };

  const handleSaveCampaign = () => {
    
    alert("Campaign saved successfully!");
    navigate("/campaign-history");
  };

  const previewAudienceSize = () => {
    
    setAudienceSize(Math.floor(Math.random() * 1000) + 100); 
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Campaign</h2>
      <div className="space-y-4">
        {rules.map((rule, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="field"
              value={rule.field}
              onChange={(e) => handleRuleChange(e, index)}
              placeholder="Field (e.g. spend)"
              className="border p-2 rounded"
            />
<select
  name="operator"
  value={rule.operator}
  onChange={(e) => handleRuleChange(e, index)}
  className="border p-2 rounded"
>
  <option value="">Select Operator</option>
  <option value="&gt;">&gt;</option>  
  <option value="&lt;">&lt;</option>  
  <option value="=">=</option>
</select>

            <input
              type="text"
              name="value"
              value={rule.value}
              onChange={(e) => handleRuleChange(e, index)}
              placeholder="Value (e.g. 10000)"
              className="border p-2 rounded"
            />
            <button
              onClick={() => handleRemoveRule(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleAddRule}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Condition
        </button>
        <button
          onClick={previewAudienceSize}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Preview Audience Size
        </button>
        {audienceSize !== null && (
          <p className="mt-2 text-gray-700">Audience size: {audienceSize}</p>
        )}
        <button
          onClick={handleSaveCampaign}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded mt-6"
        >
          Save Campaign
        </button>
      </div>
    </div>
  );
}
