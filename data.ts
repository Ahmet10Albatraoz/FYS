import { BrandData } from './types';

export const BRANDS: BrandData[] = [
  {
    id: 'nike',
    name: 'Nike',
    logo: 'https://www.logo.wine/a/logo/Nike%2C_Inc./Nike%2C_Inc.-Logo.wine.svg',
    models: {
      men: ['Air Force 1 \'07', 'Air Max 90', 'Air Jordan 1 Retro', 'Dunk Low Premium', 'Air Zoom Pegasus 40', 'Air Max 270', 'Air VaporMax', 'Jordan Stay Loyal'],
      women: ['Air Force 1 Shadow', 'Dunk Low SE', 'Air Max 270', 'Air VaporMax Plus', 'V2K Run', 'Cortez', 'Air Max Pulse'],
      kids: ['Court Borough Low 2', 'Air Force 1 LE', 'Star Runner 3', 'Flex Runner 2']
    },
    sizeCharts: {
      men: [
        { cm: 24.0, eu: '38.5', us: '6', uk: '5.5' }, { cm: 24.5, eu: '39', us: '6.5', uk: '6' }, 
        { cm: 25.0, eu: '40', us: '7', uk: '6' }, { cm: 25.5, eu: '40.5', us: '7.5', uk: '6.5' }, 
        { cm: 26.0, eu: '41', us: '8', uk: '7' }, { cm: 26.5, eu: '42', us: '8.5', uk: '7.5' }, 
        { cm: 27.0, eu: '42.5', us: '9', uk: '8' }, { cm: 27.5, eu: '43', us: '9.5', uk: '8.5' }, 
        { cm: 28.0, eu: '44', us: '10', uk: '9' }, { cm: 28.5, eu: '44.5', us: '10.5', uk: '9.5' }, 
        { cm: 29.0, eu: '45', us: '11', uk: '10' }, { cm: 29.5, eu: '45.5', us: '11.5', uk: '10.5' },
        { cm: 30.0, eu: '46', us: '12', uk: '11' }, { cm: 31.0, eu: '47', us: '13', uk: '12' },
        { cm: 32.0, eu: '48', us: '14', uk: '13' }, { cm: 33.0, eu: '49', us: '15', uk: '14' },
        { cm: 34.0, eu: '50', us: '16', uk: '15' }
      ],
      women: [
        { cm: 22.0, eu: '35.5', us: '5', uk: '2.5' }, { cm: 22.5, eu: '36', us: '5.5', uk: '3' }, 
        { cm: 23.0, eu: '36.5', us: '6', uk: '3.5' }, { cm: 23.5, eu: '37.5', us: '6.5', uk: '4' },
        { cm: 24.0, eu: '38', us: '7', uk: '4.5' }, { cm: 24.5, eu: '38.5', us: '7.5', uk: '5' },
        { cm: 25.0, eu: '39', us: '8', uk: '5.5' }, { cm: 25.5, eu: '40', us: '8.5', uk: '6' },
        { cm: 26.0, eu: '40.5', us: '9', uk: '6.5' }, { cm: 26.5, eu: '41', us: '9.5', uk: '7' },
        { cm: 27.0, eu: '42', us: '10', uk: '7.5' }, { cm: 27.5, eu: '42.5', us: '10.5', uk: '8' },
        { cm: 28.0, eu: '43', us: '11', uk: '8.5' }, { cm: 28.5, eu: '44', us: '11.5', uk: '9' },
        { cm: 29.0, eu: '44.5', us: '12', uk: '9.5' }
      ],
      kids: [
        { cm: 8.0, eu: '17', us: '1C', uk: '0.5' }, { cm: 9.0, eu: '18.5', us: '2C', uk: '1.5' },
        { cm: 10.0, eu: '19.5', us: '3C', uk: '2.5' }, { cm: 11.0, eu: '21', us: '4C', uk: '3.5' },
        { cm: 12.0, eu: '22', us: '5C', uk: '4.5' }, { cm: 13.0, eu: '23.5', us: '6C', uk: '5.5' },
        { cm: 14.0, eu: '25', us: '7C', uk: '6.5' }, { cm: 15.0, eu: '26', us: '8C', uk: '7.5' },
        { cm: 16.0, eu: '27', us: '9C', uk: '8.5' }, { cm: 17.0, eu: '28', us: '10C', uk: '9.5' },
        { cm: 18.0, eu: '29.5', us: '11C', uk: '10.5' }, { cm: 19.0, eu: '31', us: '12C', uk: '11.5' },
        { cm: 20.0, eu: '32', us: '1Y', uk: '13.5' }, { cm: 21.0, eu: '33.5', us: '2Y', uk: '1.5' },
        { cm: 22.0, eu: '35', us: '3Y', uk: '2.5' }
      ]
    }
  },
  {
    id: 'adidas',
    name: 'Adidas',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    models: {
      men: ['Samba OG', 'Gazelle Indoors', 'Superstar Classic', 'Stan Smith Lux', 'Ultraboost Light', 'Campus 00s', 'Forum Low', 'NMD_V3'],
      women: ['Samba OG W', 'Gazelle Bold Platform', 'Astir SN', 'Ozmillen', 'Falcon', 'NMD_R1', 'Supernova'],
      kids: ['Superstar 360', 'Stan Smith CF', 'Grand Court 2.0', 'Samba Kids']
    },
    sizeCharts: {
      men: [
        { cm: 24.5, eu: '40', us: '7', uk: '6.5' }, { cm: 25.0, eu: '40 2/3', us: '7.5', uk: '7' }, 
        { cm: 25.5, eu: '41 1/3', us: '8', uk: '7.5' }, { cm: 26.0, eu: '42', us: '8.5', uk: '8' }, 
        { cm: 26.5, eu: '42 2/3', us: '9', uk: '8.5' }, { cm: 27.0, eu: '43 1/3', us: '9.5', uk: '9' },
        { cm: 27.5, eu: '44', us: '10', uk: '9.5' }, { cm: 28.0, eu: '44 2/3', us: '10.5', uk: '10' },
        { cm: 28.5, eu: '45 1/3', us: '11', uk: '10.5' }, { cm: 29.0, eu: '46', us: '11.5', uk: '11' },
        { cm: 29.5, eu: '46 2/3', us: '12', uk: '11.5' }, { cm: 30.0, eu: '47 1/3', us: '12.5', uk: '12' },
        { cm: 30.5, eu: '48', us: '13', uk: '12.5' }, { cm: 31.0, eu: '48 2/3', us: '13.5', uk: '13' },
        { cm: 32.0, eu: '50', us: '15', uk: '14.5' }
      ],
      women: [
        { cm: 22.0, eu: '35 1/3', us: '5', uk: '3.5' }, { cm: 22.5, eu: '36', us: '5.5', uk: '4' },
        { cm: 23.0, eu: '36 2/3', us: '6', uk: '4.5' }, { cm: 23.5, eu: '37 1/3', us: '6.5', uk: '5' },
        { cm: 24.0, eu: '38', us: '7', uk: '5.5' }, { cm: 24.5, eu: '38 2/3', us: '7.5', uk: '6' },
        { cm: 25.0, eu: '39 1/3', us: '8', uk: '6.5' }, { cm: 25.5, eu: '40', us: '8.5', uk: '7' },
        { cm: 26.0, eu: '40 2/3', us: '9', uk: '7.5' }, { cm: 26.5, eu: '41 1/3', us: '9.5', uk: '8' },
        { cm: 27.0, eu: '42', us: '10', uk: '8.5' }, { cm: 27.5, eu: '42 2/3', us: '10.5', uk: '9' },
        { cm: 28.0, eu: '43 1/3', us: '11', uk: '9.5' }
      ],
      kids: [
        { cm: 10.0, eu: '19', us: '4K', uk: '3.5' }, { cm: 11.5, eu: '21', us: '5.5K', uk: '5' },
        { cm: 13.0, eu: '23', us: '7K', uk: '6.5' }, { cm: 14.5, eu: '25', us: '8.5K', uk: '8' },
        { cm: 16.0, eu: '27', us: '10K', uk: '9.5' }, { cm: 17.5, eu: '29', us: '11.5K', uk: '11' },
        { cm: 19.0, eu: '31', us: '13K', uk: '12.5' }, { cm: 20.5, eu: '33', us: '1.5', uk: '1' },
        { cm: 22.0, eu: '35', us: '3', uk: '2.5' }, { cm: 23.5, eu: '37', us: '4.5', uk: '4' }
      ]
    }
  },
  {
    id: 'newbalance',
    name: 'New Balance',
    logo: 'https://www.logo.wine/a/logo/New_Balance/New_Balance-Logo.wine.svg',
    models: {
      men: ['550', '2002R', '9060', '574 Core', '1906R', 'Fresh Foam 1080', '990v6'],
      women: ['530', '550 W', '327', '574 W', 'Fresh Foam x Hierro'],
      kids: ['574 Kids', '327 Kids', 'Fresh Foam Arishi']
    },
    sizeCharts: {
      men: [
        { cm: 25.0, eu: '40', us: '7', uk: '6.5' }, { cm: 25.5, eu: '40.5', us: '7.5', uk: '7' },
        { cm: 26.0, eu: '41.5', us: '8', uk: '7.5' }, { cm: 26.5, eu: '42', us: '8.5', uk: '8' },
        { cm: 27.0, eu: '42.5', us: '9', uk: '8.5' }, { cm: 27.5, eu: '43', us: '9.5', uk: '9' },
        { cm: 28.0, eu: '44', us: '10', uk: '9.5' }, { cm: 28.5, eu: '44.5', us: '10.5', uk: '10' },
        { cm: 29.0, eu: '45', us: '11', uk: '10.5' }, { cm: 29.5, eu: '45.5', us: '11.5', uk: '11' },
        { cm: 30.0, eu: '46.5', us: '12', uk: '11.5' }, { cm: 30.5, eu: '47', us: '12.5', uk: '12' },
        { cm: 31.0, eu: '47.5', us: '13', uk: '12.5' }, { cm: 32.0, eu: '49', us: '14', uk: '13.5' },
        { cm: 33.0, eu: '50', us: '15', uk: '14.5' }
      ],
      women: [
        { cm: 22.0, eu: '35', us: '5', uk: '3' }, { cm: 22.5, eu: '36', us: '5.5', uk: '3.5' },
        { cm: 23.0, eu: '36.5', us: '6', uk: '4' }, { cm: 23.5, eu: '37', us: '6.5', uk: '4.5' },
        { cm: 24.0, eu: '37.5', us: '7', uk: '5' }, { cm: 24.5, eu: '38', us: '7.5', uk: '5.5' },
        { cm: 25.0, eu: '39', us: '8', uk: '6' }, { cm: 25.5, eu: '40', us: '8.5', uk: '6.5' },
        { cm: 26.0, eu: '40.5', us: '9', uk: '7' }, { cm: 26.5, eu: '41', us: '9.5', uk: '7.5' },
        { cm: 27.0, eu: '41.5', us: '10', uk: '8' }, { cm: 27.5, eu: '42', us: '10.5', uk: '8.5' },
        { cm: 28.0, eu: '42.5', us: '11', uk: '9' }
      ],
      kids: [
        { cm: 9.5, eu: '17', us: '2', uk: '1' }, { cm: 10.5, eu: '18.5', us: '3', uk: '2.5' },
        { cm: 11.5, eu: '20', us: '4', uk: '3.5' }, { cm: 12.5, eu: '21', us: '5', uk: '4.5' },
        { cm: 14.5, eu: '23.5', us: '7', uk: '6.5' }, { cm: 15.5, eu: '25', us: '8', uk: '7.5' },
        { cm: 17.0, eu: '28', us: '11', uk: '10.5' }, { cm: 18.5, eu: '30', us: '12.5', uk: '12' },
        { cm: 20.0, eu: '32.5', us: '1', uk: '13.5' }, { cm: 21.0, eu: '33.5', us: '2', uk: '1.5' },
        { cm: 22.0, eu: '35', us: '3', uk: '2.5' }, { cm: 23.5, eu: '37', us: '5', uk: '4.5' }
      ]
    }
  },
  {
    id: 'puma',
    name: 'Puma',
    logo: 'https://www.logo.wine/a/logo/Puma_(brand)/Puma_(brand)-Logo.wine.svg',
    models: {
      men: ['Suede Classic', 'RS-X Efekt', 'Slipstream', 'Cali Court', 'Velocity Nitro 3', 'Palermo'],
      women: ['Mayze Stack', 'Cali Dream', 'Cilia Mode', 'RS-X W', 'Softride'],
      kids: ['Smash v2', 'Stepfleex 2', 'Puma Rickie']
    },
    sizeCharts: {
      men: [
        { cm: 25.0, eu: '39', us: '7', uk: '6' },
        { cm: 25.5, eu: '40', us: '7.5', uk: '6.5' },
        { cm: 26.0, eu: '40.5', us: '8', uk: '7' },
        { cm: 26.5, eu: '41', us: '8.5', uk: '7.5' },
        { cm: 27.0, eu: '42', us: '9', uk: '8' },
        { cm: 27.5, eu: '42.5', us: '9.5', uk: '8.5' },
        { cm: 28.0, eu: '43', us: '10', uk: '9' },
        { cm: 28.5, eu: '44', us: '10.5', uk: '9.5' },
        { cm: 29.0, eu: '44.5', us: '11', uk: '10' },
        { cm: 29.5, eu: '45', us: '11.5', uk: '10.5' },
        { cm: 30.0, eu: '46', us: '12', uk: '11' },
        { cm: 31.0, eu: '47', us: '13', uk: '12' },
        { cm: 32.0, eu: '48.5', us: '14', uk: '13' }
      ],
      women: [
        { cm: 21.5, eu: '35', us: '5', uk: '2.5' },
        { cm: 22.0, eu: '35.5', us: '5.5', uk: '3' },
        { cm: 22.5, eu: '36', us: '6', uk: '3.5' },
        { cm: 23.0, eu: '37', us: '6.5', uk: '4' },
        { cm: 23.5, eu: '37.5', us: '7', uk: '4.5' },
        { cm: 24.0, eu: '38', us: '7.5', uk: '5' },
        { cm: 24.5, eu: '38.5', us: '8', uk: '5.5' },
        { cm: 25.0, eu: '39', us: '8.5', uk: '6' },
        { cm: 25.5, eu: '40', us: '9', uk: '6.5' },
        { cm: 26.0, eu: '40.5', us: '9.5', uk: '7' },
        { cm: 26.5, eu: '41', us: '10', uk: '7.5' },
        { cm: 27.0, eu: '42', us: '10.5', uk: '8' },
        { cm: 27.5, eu: '42.5', us: '11', uk: '8.5' }
      ],
      kids: [
        { cm: 12.0, eu: '19', us: '4', uk: '3' },
        { cm: 12.5, eu: '20', us: '5', uk: '4' },
        { cm: 13.0, eu: '21', us: '5.5', uk: '4.5' },
        { cm: 13.5, eu: '22', us: '6', uk: '5' },
        { cm: 14.5, eu: '23', us: '7', uk: '6' },
        { cm: 15.0, eu: '24', us: '8', uk: '7' },
        { cm: 15.5, eu: '25', us: '9', uk: '8.5' },
        { cm: 16.0, eu: '26', us: '9.5', uk: '8.5' },
        { cm: 16.5, eu: '27', us: '10', uk: '9' },
        { cm: 17.0, eu: '28', us: '11', uk: '10' },
        { cm: 17.5, eu: '29', us: '11.5', uk: '10.5' },
        { cm: 18.0, eu: '30', us: '12', uk: '11' },
        { cm: 18.5, eu: '31', us: '13', uk: '12' },
        { cm: 19.0, eu: '32', us: '1', uk: '13' },
        { cm: 20.0, eu: '33', us: '2', uk: '1' },
        { cm: 20.5, eu: '34', us: '2.5', uk: '1.5' },
        { cm: 21.0, eu: '35', us: '3', uk: '2' },
        { cm: 22.5, eu: '36', us: '4.5', uk: '3.5' },
        { cm: 23.0, eu: '37', us: '5', uk: '4' },
        { cm: 24.0, eu: '38', us: '6', uk: '5' }
      ]
    }
  },
  {
    id: 'merrell',
    name: 'Merrell',
    logo: 'https://cdn.worldvectorlogo.com/logos/merrell.svg',
    models: {
      men: ['Moab 3 GTX', 'Moab Speed 2', 'Agility Peak 5', 'Hydro Moc', 'Nova 3'],
      women: ['Moab 3 W', 'Antora 3', 'Bravada 2'],
      kids: ['Moab FST Low', 'Hydro Drift']
    },
    sizeCharts: {
      men: [
        { cm: 25.0, eu: '40', us: '7', uk: '6.5' },
        { cm: 25.5, eu: '41', us: '7.5', uk: '7' },
        { cm: 26.0, eu: '41.5', us: '8', uk: '7.5' },
        { cm: 26.5, eu: '42', us: '8.5', uk: '8' },
        { cm: 27.0, eu: '43', us: '9', uk: '8.5' },
        { cm: 27.5, eu: '43.5', us: '9.5', uk: '9' },
        { cm: 28.0, eu: '44', us: '10', uk: '9.5' },
        { cm: 28.5, eu: '44.5', us: '10.5', uk: '10' },
        { cm: 29.0, eu: '45', us: '11', uk: '10.5' },
        { cm: 29.5, eu: '46', us: '11.5', uk: '11' },
        { cm: 30.0, eu: '46.5', us: '12', uk: '11.5' },
        { cm: 31.0, eu: '48', us: '13', uk: '12.5' },
        { cm: 32.0, eu: '49', us: '14', uk: '13.5' },
        { cm: 33.0, eu: '50', us: '15', uk: '14.5' },
        { cm: 34.0, eu: '51', us: '16', uk: '15.5' }
      ],
      women: [
        { cm: 22.0, eu: '35', us: '5', uk: '2.5' },
        { cm: 22.5, eu: '36', us: '5.5', uk: '3' },
        { cm: 23.0, eu: '37', us: '6', uk: '3.5' },
        { cm: 23.5, eu: '37.5', us: '6.5', uk: '4' },
        { cm: 24.0, eu: '38', us: '7', uk: '4.5' },
        { cm: 24.5, eu: '38.5', us: '7.5', uk: '5' },
        { cm: 25.0, eu: '39', us: '8', uk: '5.5' },
        { cm: 25.5, eu: '40', us: '8.5', uk: '6' },
        { cm: 26.0, eu: '40.5', us: '9', uk: '6.5' },
        { cm: 26.5, eu: '41', us: '9.5', uk: '7' },
        { cm: 27.0, eu: '42', us: '10', uk: '7.5' },
        { cm: 27.5, eu: '42.5', us: '10.5', uk: '8' },
        { cm: 28.5, eu: '43', us: '11', uk: '8.5' }
      ],
      kids: [
        { cm: 17.0, eu: '28', us: '11', uk: '10.5' },
        { cm: 18.0, eu: '29', us: '12', uk: '11' },
        { cm: 18.5, eu: '30', us: '12.5', uk: '11.5' },
        { cm: 19.5, eu: '31', us: '13.5', uk: '12.5' },
        { cm: 20.0, eu: '32', us: '1', uk: '13' },
        { cm: 21.0, eu: '33', us: '2', uk: '1' },
        { cm: 21.5, eu: '34', us: '2.5', uk: '1.5' },
        { cm: 22.5, eu: '35', us: '3.5', uk: '2.5' },
        { cm: 23.0, eu: '36', us: '4', uk: '3' },
        { cm: 24.0, eu: '37', us: '5', uk: '4' },
        { cm: 25.0, eu: '38', us: '6', uk: '5' }
      ]
    }
  },
  {
    id: 'vans',
    name: 'Vans',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vans-logo.svg/1200px-Vans-logo.svg.png',
    models: {
      men: ['Old Skool', 'Sk8-Hi Classic', 'Authentic', 'Era', 'Classic Slip-On', 'Knu Skool'],
      women: ['Old Skool Platform', 'Classic Slip-On Checkerboard', 'Authentic W'],
      kids: ['Old Skool V', 'Sk8-Hi Zip', 'Slip-On V']
    },
    sizeCharts: {
      men: [
        { cm: 22.5, eu: '35', us: '3.5', uk: '2.5' },
        { cm: 23.0, eu: '36', us: '4.5', uk: '3.5' },
        { cm: 23.5, eu: '36.5', us: '5', uk: '4' },
        { cm: 24.0, eu: '37', us: '5.5', uk: '4.5' },
        { cm: 24.5, eu: '38', us: '6', uk: '5' },
        { cm: 25.0, eu: '38.5', us: '6.5', uk: '5.5' },
        { cm: 25.5, eu: '39', us: '7', uk: '6' },
        { cm: 26.0, eu: '40', us: '7.5', uk: '6.5' },
        { cm: 26.5, eu: '40.5', us: '8', uk: '7' },
        { cm: 27.0, eu: '41', us: '8.5', uk: '7.5' },
        { cm: 27.5, eu: '42', us: '9', uk: '8' },
        { cm: 28.0, eu: '42.5', us: '9.5', uk: '8.5' },
        { cm: 28.5, eu: '43', us: '10', uk: '9' },
        { cm: 29.0, eu: '44', us: '10.5', uk: '9.5' },
        { cm: 29.5, eu: '44.5', us: '11', uk: '10' },
        { cm: 30.0, eu: '45', us: '11.5', uk: '10.5' },
        { cm: 30.5, eu: '46', us: '12', uk: '11' },
        { cm: 31.0, eu: '47', us: '13', uk: '12' }
      ],
      women: [
        { cm: 21.5, eu: '34.5', us: '5', uk: '2.5' },
        { cm: 22.0, eu: '35', us: '5.5', uk: '3' },
        { cm: 22.5, eu: '36', us: '6', uk: '3.5' },
        { cm: 23.0, eu: '36.5', us: '6.5', uk: '4' },
        { cm: 23.5, eu: '37', us: '7', uk: '4.5' },
        { cm: 24.0, eu: '38', us: '7.5', uk: '5' },
        { cm: 24.5, eu: '38.5', us: '8', uk: '5.5' },
        { cm: 25.0, eu: '39', us: '8.5', uk: '6' },
        { cm: 25.5, eu: '40', us: '9', uk: '6.5' },
        { cm: 26.0, eu: '40.5', us: '9.5', uk: '7' },
        { cm: 26.5, eu: '41', us: '10', uk: '7.5' },
        { cm: 27.0, eu: '42', us: '10.5', uk: '8' },
        { cm: 27.5, eu: '42.5', us: '11', uk: '8.5' }
      ],
      kids: [
        { cm: 11.0, eu: '19', us: '4', uk: '3' },
        { cm: 12.0, eu: '20', us: '5', uk: '4' },
        { cm: 13.0, eu: '21', us: '6', uk: '5' },
        { cm: 14.0, eu: '22', us: '7', uk: '6' },
        { cm: 15.0, eu: '23.5', us: '8.5', uk: '7.5' },
        { cm: 16.0, eu: '25', us: '10', uk: '9' },
        { cm: 17.0, eu: '26.5', us: '11.5', uk: '10.5' },
        { cm: 18.0, eu: '27.5', us: '13', uk: '12' },
        { cm: 19.0, eu: '29', us: '1', uk: '13' },
        { cm: 20.0, eu: '30', us: '2', uk: '1' },
        { cm: 21.0, eu: '31', us: '3', uk: '2' },
        { cm: 22.0, eu: '32', us: '4', uk: '3' },
        { cm: 23.0, eu: '33', us: '5', uk: '4' },
        { cm: 24.0, eu: '34', us: '6', uk: '5' }
      ]
    }
  },
  {
    id: 'converse',
    name: 'Converse',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/1200px-Converse_logo.svg.png',
    models: {
      men: ['Chuck Taylor All Star Hi', 'Chuck 70 Ox', 'One Star Pro', 'Run Star Hike'],
      women: ['Chuck Taylor Platform', 'Run Star Motion', 'Chuck 70 High'],
      kids: ['Chuck Taylor Kids Hi', 'All Star Crib']
    },
    sizeCharts: {
      men: [
        { cm: 22.0, eu: '35', us: '3', uk: '3' },
        { cm: 22.5, eu: '36', us: '3.5', uk: '3.5' },
        { cm: 23.0, eu: '36.5', us: '4', uk: '4' },
        { cm: 23.5, eu: '37', us: '4.5', uk: '4.5' },
        { cm: 24.0, eu: '37.5', us: '5', uk: '5' },
        { cm: 24.5, eu: '38', us: '5.5', uk: '5.5' },
        { cm: 24.75, eu: '39', us: '6', uk: '6' },
        { cm: 25.0, eu: '39.5', us: '6.5', uk: '6.5' },
        { cm: 25.5, eu: '40', us: '7', uk: '7' },
        { cm: 26.0, eu: '41', us: '7.5', uk: '7.5' },
        { cm: 26.5, eu: '41.5', us: '8', uk: '8' },
        { cm: 27.0, eu: '42', us: '8.5', uk: '8.5' },
        { cm: 27.5, eu: '42.5', us: '9', uk: '9' },
        { cm: 28.0, eu: '43', us: '9.5', uk: '9.5' },
        { cm: 28.5, eu: '44', us: '10', uk: '10' },
        { cm: 29.0, eu: '44.5', us: '10.5', uk: '10.5' },
        { cm: 29.5, eu: '45', us: '11', uk: '11' },
        { cm: 30.0, eu: '46', us: '11.5', uk: '11.5' },
        { cm: 30.5, eu: '46.5', us: '12', uk: '12' },
        { cm: 31.5, eu: '48', us: '13', uk: '13' }
      ],
      women: [
        { cm: 22.0, eu: '35', us: '5', uk: '3' },
        { cm: 22.5, eu: '36', us: '5.5', uk: '3.5' },
        { cm: 23.0, eu: '36.5', us: '6', uk: '4' },
        { cm: 23.5, eu: '37', us: '6.5', uk: '4.5' },
        { cm: 24.0, eu: '37.5', us: '7', uk: '5' },
        { cm: 24.5, eu: '38', us: '7.5', uk: '5.5' },
        { cm: 24.75, eu: '39', us: '8', uk: '6' },
        { cm: 25.0, eu: '39.5', us: '8.5', uk: '6.5' },
        { cm: 25.5, eu: '40', us: '9', uk: '7' },
        { cm: 26.0, eu: '41', us: '9.5', uk: '7.5' },
        { cm: 26.5, eu: '41.5', us: '10', uk: '8' },
        { cm: 27.0, eu: '42', us: '10.5', uk: '8.5' },
        { cm: 27.5, eu: '42.5', us: '11', uk: '9' }
      ],
      kids: [
        { cm: 9.0, eu: '17', us: '2', uk: '1.5' },
        { cm: 10.0, eu: '18', us: '3', uk: '2.5' },
        { cm: 11.0, eu: '19', us: '4', uk: '3.5' },
        { cm: 12.0, eu: '20', us: '5', uk: '4.5' },
        { cm: 13.0, eu: '21', us: '6', uk: '5.5' },
        { cm: 14.0, eu: '22', us: '7', uk: '6.5' },
        { cm: 15.0, eu: '23', us: '8', uk: '7.5' },
        { cm: 16.0, eu: '24', us: '9', uk: '8.5' },
        { cm: 17.0, eu: '25', us: '10', uk: '9.5' },
        { cm: 17.5, eu: '26', us: '11', uk: '10.5' },
        { cm: 18.5, eu: '27', us: '12', uk: '11.5' },
        { cm: 19.0, eu: '28', us: '13', uk: '12.5' },
        { cm: 19.5, eu: '29', us: '1', uk: '13.5' },
        { cm: 20.0, eu: '30', us: '2', uk: '1.5' },
        { cm: 21.0, eu: '31', us: '3', uk: '2.5' },
        { cm: 22.0, eu: '32', us: '4', uk: '3.5' },
        { cm: 22.5, eu: '33', us: '5', uk: '4.5' },
        { cm: 23.0, eu: '34', us: '6', uk: '5.5' }
      ]
    }
  },
  {
    id: 'underarmour',
    name: 'Under Armour',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Under_armour_logo.svg/1200px-Under_armour_logo.svg.png',
    models: {
      men: ['Curry 11', 'Hovr Phantom 3', 'Charged Assert 10', 'Project Rock 6', 'Apparition'],
      women: ['Hovr Machina 3', 'Charged Breathe', 'Flow Dynamic'],
      kids: ['Assert 10 GS', 'Surge 3']
    },
    sizeCharts: {
      men: [
        { cm: 25.0, eu: '40', us: '7', uk: '6' }, { cm: 25.5, eu: '40.5', us: '7.5', uk: '6.5' },
        { cm: 26.0, eu: '41', us: '8', uk: '7' }, { cm: 26.5, eu: '42', us: '8.5', uk: '7.5' },
        { cm: 27.0, eu: '42.5', us: '9', uk: '8' }, { cm: 27.5, eu: '43', us: '9.5', uk: '8.5' },
        { cm: 28.0, eu: '44', us: '10', uk: '9' }, { cm: 28.5, eu: '44.5', us: '10.5', uk: '9.5' },
        { cm: 29.0, eu: '45', us: '11', uk: '10' }, { cm: 30.0, eu: '46', us: '12', uk: '11' },
        { cm: 31.0, eu: '47.5', us: '13', uk: '12' }, { cm: 32.0, eu: '48.5', us: '14', uk: '13' }
      ],
      women: [
        { cm: 22.0, eu: '35.5', us: '5', uk: '2.5' }, { cm: 22.5, eu: '36', us: '5.5', uk: '3' },
        { cm: 23.0, eu: '36.5', us: '6', uk: '3.5' }, { cm: 23.5, eu: '37.5', us: '6.5', uk: '4' },
        { cm: 24.0, eu: '38', us: '7', uk: '4.5' }, { cm: 24.5, eu: '38.5', us: '7.5', uk: '5' },
        { cm: 25.0, eu: '39', us: '8', uk: '5.5' }, { cm: 25.5, eu: '40', us: '8.5', uk: '6' },
        { cm: 26.0, eu: '40.5', us: '9', uk: '6.5' }, { cm: 26.5, eu: '41', us: '9.5', uk: '7' },
        { cm: 27.0, eu: '42', us: '10', uk: '7.5' }
      ],
      kids: [
        { cm: 17.0, eu: '28', us: '11K', uk: '10.5' }, { cm: 18.0, eu: '29.5', us: '12K', uk: '11.5' },
        { cm: 19.0, eu: '31', us: '13K', uk: '12.5' }, { cm: 20.0, eu: '32', us: '1Y', uk: '13.5' },
        { cm: 21.0, eu: '33.5', us: '2Y', uk: '1.5' }, { cm: 22.0, eu: '35', us: '3Y', uk: '2.5' },
        { cm: 23.0, eu: '36', us: '4Y', uk: '3.5' }
      ]
    }
  },
  {
    id: 'reebok',
    name: 'Reebok',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Reebok_2019_logo.svg/1200px-Reebok_2019_logo.svg.png',
    models: {
      men: ['Club C 85', 'Classic Leather', 'Nano X4', 'Question Mid', 'BB 4000 II'],
      women: ['Club C Double', 'Classic Leather SP', 'Nano X4 W'],
      kids: ['Royal Complete', 'Weebok Storm']
    },
    sizeCharts: {
      men: [
        { cm: 25.0, eu: '39', us: '7', uk: '6' }, { cm: 25.5, eu: '40', us: '7.5', uk: '6.5' },
        { cm: 26.0, eu: '40.5', us: '8', uk: '7' }, { cm: 26.5, eu: '41', us: '8.5', uk: '7.5' },
        { cm: 27.0, eu: '42', us: '9', uk: '8' }, { cm: 27.5, eu: '42.5', us: '9.5', uk: '8.5' },
        { cm: 28.0, eu: '43', us: '10', uk: '9' }, { cm: 28.5, eu: '44', us: '10.5', uk: '9.5' },
        { cm: 29.0, eu: '44.5', us: '11', uk: '10' }, { cm: 30.0, eu: '45.5', us: '12', uk: '11' },
        { cm: 31.0, eu: '47', us: '13', uk: '12' }, { cm: 32.0, eu: '48.5', us: '14', uk: '13' }
      ],
      women: [
        { cm: 22.0, eu: '35', us: '5', uk: '2.5' }, { cm: 22.5, eu: '35.5', us: '5.5', uk: '3' },
        { cm: 23.0, eu: '36', us: '6', uk: '3.5' }, { cm: 23.5, eu: '37', us: '6.5', uk: '4' },
        { cm: 24.0, eu: '37.5', us: '7', uk: '4.5' }, { cm: 24.5, eu: '38', us: '7.5', uk: '5' },
        { cm: 25.0, eu: '38.5', us: '8', uk: '5.5' }, { cm: 25.5, eu: '39', us: '8.5', uk: '6' },
        { cm: 26.0, eu: '40', us: '9', uk: '6.5' }, { cm: 27.0, eu: '41', us: '10', uk: '7.5' },
        { cm: 28.0, eu: '42.5', us: '11', uk: '8.5' }
      ],
      kids: [
        { cm: 12.0, eu: '19.5', us: '4', uk: '3.5' }, { cm: 14.0, eu: '22', us: '6', uk: '5.5' },
        { cm: 16.0, eu: '25', us: '8.5', uk: '8' }, { cm: 18.0, eu: '28', us: '11', uk: '10.5' },
        { cm: 20.0, eu: '31.5', us: '1', uk: '13.5' }, { cm: 22.0, eu: '34.5', us: '3', uk: '2.5' },
        { cm: 23.5, eu: '37', us: '5', uk: '4.5' }
      ]
    }
  },
  {
    id: 'kinetix',
    name: 'Kinetix',
    logo: 'https://kinetix-next.mncdn.com/logo.png',
    models: {
      men: ['Basic Sneaker', 'Running Series', 'Daily Comfort', 'Nature Collection'],
      women: ['Fashion Sneaker', 'Grace Daily', 'Soft Step'],
      kids: ['Sport Kids', 'School Series']
    },
    sizeCharts: {
      men: [
        { cm: 25.0, eu: '39', us: '6.5', uk: '6' },
        { cm: 25.5, eu: '40', us: '7.5', uk: '6.5' },
        { cm: 26.5, eu: '41', us: '8.5', uk: '7.5' },
        { cm: 27.0, eu: '42', us: '9', uk: '8' },
        { cm: 27.5, eu: '43', us: '9.5', uk: '8.5' },
        { cm: 28.5, eu: '44', us: '10.5', uk: '9.5' },
        { cm: 29.0, eu: '45', us: '11', uk: '10' },
        { cm: 30.0, eu: '46', us: '12', uk: '11' },
        { cm: 31.0, eu: '47', us: '13', uk: '12' },
        { cm: 32.0, eu: '48', us: '14', uk: '13' }
      ],
      women: [
        { cm: 22.5, eu: '35', us: '5', uk: '3' },
        { cm: 23.0, eu: '36', us: '6', uk: '4' },
        { cm: 24.0, eu: '37', us: '7', uk: '5' },
        { cm: 25.0, eu: '38', us: '8', uk: '6' },
        { cm: 25.5, eu: '39', us: '9', uk: '7' },
        { cm: 26.5, eu: '40', us: '10', uk: '8' },
        { cm: 27.0, eu: '41', us: '11', uk: '9' }
      ],
      kids: [
        { cm: 12.0, eu: '19', us: '3', uk: '2' },
        { cm: 12.5, eu: '20', us: '4', uk: '3' },
        { cm: 13.0, eu: '21', us: '5', uk: '4' },
        { cm: 13.5, eu: '22', us: '6', uk: '5' },
        { cm: 14.5, eu: '23', us: '7', uk: '6' },
        { cm: 15.0, eu: '24', us: '8', uk: '7' },
        { cm: 15.5, eu: '25', us: '9', uk: '8' },
        { cm: 16.0, eu: '26', us: '10', uk: '9' },
        { cm: 16.5, eu: '27', us: '11', uk: '10' },
        { cm: 17.5, eu: '28', us: '12', uk: '11' },
        { cm: 18.0, eu: '29', us: '13', uk: '12' },
        { cm: 18.5, eu: '30', us: '13.5', uk: '12.5' },
        { cm: 19.5, eu: '31', us: '1', uk: '13' },
        { cm: 20.0, eu: '32', us: '2', uk: '1' },
        { cm: 20.5, eu: '33', us: '3', uk: '2' },
        { cm: 21.5, eu: '34', us: '4', uk: '3' },
        { cm: 22.0, eu: '35', us: '5', uk: '4' }
      ]
    }
  },
  {
    id: 'asics',
    name: 'Asics',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Asics_Logo.svg/1200px-Asics_Logo.svg.png',
    models: {
      men: ['Gel-Kayano 30', 'Gel-Nimbus 25', 'GT-2000 12', 'Gel-Quantum 360', 'Novablast 4'],
      women: ['Gel-Kayano 30 W', 'Gel-Cumulus 25', 'Japan S'],
      kids: ['Gel-Resolution 9 GS']
    },
    sizeCharts: {
      men: [
        { cm: 24.5, eu: '39', us: '6', uk: '5' },
        { cm: 25.0, eu: '39.5', us: '6.5', uk: '5.5' },
        { cm: 25.25, eu: '40', us: '7', uk: '6' },
        { cm: 25.5, eu: '40.5', us: '7.5', uk: '6.5' },
        { cm: 26.0, eu: '41.5', us: '8', uk: '7' },
        { cm: 26.5, eu: '42', us: '8.5', uk: '7.5' },
        { cm: 27.0, eu: '42.5', us: '9', uk: '8' },
        { cm: 27.5, eu: '43.5', us: '9.5', uk: '8.5' },
        { cm: 28.0, eu: '44', us: '10', uk: '9' },
        { cm: 28.25, eu: '44.5', us: '10.5', uk: '9.5' },
        { cm: 28.5, eu: '45', us: '11', uk: '10' },
        { cm: 29.0, eu: '46', us: '11.5', uk: '10.5' },
        { cm: 29.5, eu: '46.5', us: '12', uk: '11' },
        { cm: 30.0, eu: '47', us: '12.5', uk: '11.5' },
        { cm: 30.5, eu: '48', us: '13', uk: '12' },
        { cm: 31.0, eu: '49', us: '14', uk: '13' }
      ],
      women: [
        { cm: 22.5, eu: '35.5', us: '5', uk: '3' },
        { cm: 22.75, eu: '36', us: '5.5', uk: '3.5' },
        { cm: 23.0, eu: '37', us: '6', uk: '4' },
        { cm: 23.5, eu: '37.5', us: '6.5', uk: '4.5' },
        { cm: 24.0, eu: '38', us: '7', uk: '5' },
        { cm: 24.5, eu: '39', us: '7.5', uk: '5.5' },
        { cm: 25.0, eu: '39.5', us: '8', uk: '6' },
        { cm: 25.5, eu: '40', us: '8.5', uk: '6.5' },
        { cm: 25.75, eu: '40.5', us: '9', uk: '7' },
        { cm: 26.0, eu: '41.5', us: '9.5', uk: '7.5' },
        { cm: 26.5, eu: '42', us: '10', uk: '8' },
        { cm: 27.0, eu: '42.5', us: '10.5', uk: '8.5' },
        { cm: 27.5, eu: '43.5', us: '11', uk: '9' },
        { cm: 28.0, eu: '44', us: '11.5', uk: '9.5' },
        { cm: 28.5, eu: '44.5', us: '12', uk: '10' },
        { cm: 29.0, eu: '45', us: '12.5', uk: '10.5' }
      ],
      kids: [
        { cm: 17.0, eu: '27', us: '10.5', uk: '10' },
        { cm: 17.5, eu: '28.5', us: '11.5', uk: '11' },
        { cm: 18.5, eu: '30', us: '12.5', uk: '12' },
        { cm: 19.0, eu: '31.5', us: '13.5', uk: '13' },
        { cm: 20.0, eu: '32.5', us: '1', uk: '13.5' },
        { cm: 20.5, eu: '33', us: '2', uk: '1' },
        { cm: 21.5, eu: '34.5', us: '3', uk: '2' },
        { cm: 22.0, eu: '35', us: '3.5', uk: '2.5' },
        { cm: 22.5, eu: '36', us: '4', uk: '3' },
        { cm: 23.0, eu: '37', us: '5', uk: '4' },
        { cm: 24.0, eu: '38', us: '6', uk: '5' },
        { cm: 24.5, eu: '39', us: '7', uk: '6' },
        { cm: 25.0, eu: '39.5', us: '7.5', uk: '6.5' }
      ]
    }
  },
  {
    id: 'skechers',
    name: 'Skechers',
    logo: 'https://f-cmsskc-l.mncdn.com/e694ccc2-c840-425b-8772-185fae34fa5b',
    models: {
      men: ['Arch Fit', 'GoWalk 6', 'D\'Lites 4.0', 'Max Cushioning', 'Uno'],
      women: ['D\'Lites Fresh', 'GoWalk Joy', 'Uno Night'],
      kids: ['S-Lights']
    },
    sizeCharts: {
      men: [
        { cm: 24.5, eu: '39', us: '6.5', uk: '5.5' },
        { cm: 25.0, eu: '39.5', us: '7', uk: '6' },
        { cm: 25.5, eu: '40', us: '7.5', uk: '6.5' },
        { cm: 26.0, eu: '41', us: '8', uk: '7' },
        { cm: 26.5, eu: '41.5', us: '8.5', uk: '7.5' },
        { cm: 27.0, eu: '42', us: '9', uk: '8' },
        { cm: 27.5, eu: '42.5', us: '9.5', uk: '8.5' },
        { cm: 28.0, eu: '43', us: '10', uk: '9' },
        { cm: 28.5, eu: '44', us: '10.5', uk: '9.5' },
        { cm: 29.0, eu: '44.5', us: '11', uk: '10' },
        { cm: 29.5, eu: '45', us: '11.5', uk: '10.5' },
        { cm: 30.0, eu: '45.5', us: '12', uk: '11' },
        { cm: 31.0, eu: '47', us: '13', uk: '12' },
        { cm: 32.0, eu: '48', us: '14', uk: '13' }
      ],
      women: [
        { cm: 22.0, eu: '35', us: '5', uk: '2' },
        { cm: 22.5, eu: '35.5', us: '5.5', uk: '2.5' },
        { cm: 23.0, eu: '36', us: '6', uk: '3' },
        { cm: 23.5, eu: '36.5', us: '6.5', uk: '3.5' },
        { cm: 24.0, eu: '37', us: '7', uk: '4' },
        { cm: 24.5, eu: '37.5', us: '7.5', uk: '4.5' },
        { cm: 25.0, eu: '38', us: '8', uk: '5' },
        { cm: 25.5, eu: '38.5', us: '8.5', uk: '5.5' },
        { cm: 26.0, eu: '39', us: '9', uk: '6' },
        { cm: 26.5, eu: '39.5', us: '9.5', uk: '6.5' },
        { cm: 27.0, eu: '40', us: '10', uk: '7' },
        { cm: 28.0, eu: '41', us: '11', uk: '8' }
      ],
      kids: [
        { cm: 9.0, eu: '19', us: '3', uk: '2' },
        { cm: 10.0, eu: '20', us: '4', uk: '3' },
        { cm: 11.0, eu: '21', us: '5', uk: '4' },
        { cm: 12.0, eu: '22', us: '6', uk: '5' },
        { cm: 13.0, eu: '23', us: '7', uk: '6' },
        { cm: 14.0, eu: '24', us: '8', uk: '7' },
        { cm: 15.0, eu: '25', us: '9', uk: '8' },
        { cm: 16.0, eu: '26', us: '10', uk: '9' },
        { cm: 17.0, eu: '27', us: '11', uk: '10' },
        { cm: 18.0, eu: '28', us: '12', uk: '11' },
        { cm: 18.5, eu: '29', us: '13', uk: '12' },
        { cm: 19.0, eu: '30', us: '13.5', uk: '12.5' },
        { cm: 19.5, eu: '31', us: '1', uk: '13' },
        { cm: 20.5, eu: '32', us: '2', uk: '1' },
        { cm: 21.0, eu: '33', us: '3', uk: '2' },
        { cm: 21.5, eu: '34', us: '4', uk: '3' },
        { cm: 22.0, eu: '35', us: '5', uk: '4' },
        { cm: 23.0, eu: '36', us: '6', uk: '5' },
        { cm: 23.5, eu: '37', us: '6.5', uk: '5.5' },
        { cm: 24.0, eu: '38', us: '7', uk: '6' }
      ]
    }
  }
];

export const getBrandById = (id: string) => BRANDS.find(b => b.id === id);