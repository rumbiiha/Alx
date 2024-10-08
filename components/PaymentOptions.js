import React from 'react';
import { View } from 'react-native';
import AirtelMoney from '@/assets/AirtelMoney';
import MOMO from '@/assets/MOMO';
import { CheckCircle } from 'phosphor-react-native'; // Import the check icon

const PaymentOption = ({ selected, type }) => {
  const getBorderColor = () => {
    switch (type) {
      case 'MTN':
        return selected ? '#FECD02' : '#dee4ec'; // Yellow border for MTN
      case 'AIRTEL':
        return selected ? '#ED1C24' : '#dee4ec'; // Red border for Airtel
      default:
        return '#dee4ec'; // Default border color
    }
  };

  const getCheckIconColor = () => {
    switch (type) {
      case 'MTN':
        return '#FECD02'; // Yellow check for MTN
      case 'AIRTEL':
        return '#ED1C24'; // Red check for Airtel
      default:
        return '#4CAF50'; // Default green check (or any color you prefer)
    }
  };

  return (
    <View
      style={{
        padding: 10,
        width: '48%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: getBorderColor(),
      }}
    >
      <View style={{ alignItems: 'flex-start' }}>
        <View
          style={{
            flexDirection: 'row', // Add this to show the check icon next to the logo
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <View style={{ marginRight: 4 }}>
            {type === 'MTN' ? <MOMO /> : <AirtelMoney />}
          </View>
          {selected && (
            <CheckCircle style={{position:'absolute',right:0,top:0}} size={20} color={getCheckIconColor()} weight="fill" /> // Render check icon with dynamic color
          )}
        </View>
      </View>
    </View>
  );
};

export default PaymentOption;
