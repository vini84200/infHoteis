import { Button, Dropdown, Space, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const Reserva = () => {
    const pageStyle = {
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh', 
      padding: '20px', 
    }
  
    return (
      <div style={pageStyle}>
        <p style={{fontSize: '40px'}}>Faça sua reserva!</p>
        <div style={{fontSize: '30px'}}>
            <p >Passo 1:</p>
        </div>

        <Button type="primary" style={{ backgroundColor: 'grey', borderColor: 'grey' }}>
                Fazer Reserva
        </Button>
        
      </div>
    );
  };
  
  export default Reserva;
  