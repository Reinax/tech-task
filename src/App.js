import React from 'react';
import './App.css';
import data from './components/accommodation.json';
import roomData from './components/accommodation_availability.json'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const cleandata = () => JSON.parse(JSON.stringify(data));

// Json Data management.
const accom = data.accommodations;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const[open, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div className='AppContainer'>
      {
        accom.map((accommodation, i) => {
          return (
            <div className='SmallContainers'>
              <ul>
                <li>{accommodation.name}</li>
                <li dangerouslySetInnerHTML={{__html: accommodation.description}} />
                <li>{accommodation.type.name}</li>
              </ul>
              <div key={i}>
                <div>
                  {accommodation.facilities.map(function (facilitie, i){
                    return <div key={i}>
                      <li>{facilitie.label}</li>
                    </div>
                  })}
                </div>
              </div>
            {accommodation.rooms.map((roomInfo, i) => {
            return(
              <div key={roomInfo.id}>
              <Button onClick={handleOpen}>Open modal</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >

                <Box sx={style}>
                  {roomData.rooms.map(function (rooms, i){
                  if(rooms.id != roomInfo.id) {
                  return (
                  <div key={i}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <span>
                    Name: {roomInfo.name} <br/> Type: {roomInfo.type} <br/> Min/Max Occupancy: {roomInfo.min_occupancy} / {roomInfo.max_occupancy}
                    </span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <span>Available: {rooms.available} Total: {rooms.total}</span>
                  </Typography>
                  </div>
                  )}
                  return <div><p>Not working.</p></div>
                })})
                </Box>
              </Modal>
              </div>
          )})} 
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
