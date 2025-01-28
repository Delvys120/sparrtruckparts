import React, { useState, useEffect } from "react";
import { TruckProps, NewTruckProps } from "../types/InventoryTypes";
import axios from "axios";
import {
    Container,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Box,
    Grid2
} from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";

export const TruckInventory: React.FC = () => {
    const [trucks, setTrucks]     = useState<TruckProps[]>([]);
    const [newTruck, setNewTruck] = useState<NewTruckProps>({ 
        year: "", 
        make: "", 
        model: "", 
        status: "", 
        description: "", 
        image_file: null 
    });

    useEffect(() => {
        fetchTrucks();
    }, []);

    const fetchTrucks = async () => {
        try {
            const response = await axios.get("http://localhost:4000/trucks");
            setTrucks(response.data);
        }
        catch (err) {
            console.error("Error fetching trucks:", err);
        }
    }

    const handleAddTruck = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("year", newTruck.year);
        formData.append("make", newTruck.make);
        formData.append("model", newTruck.model);
        formData.append("status", newTruck.status);
        formData.append("description", newTruck.description);
        if (newTruck.image_file) formData.append("image", newTruck.image_file);
    
        try {
          await axios.post("http://localhost:4000/add-truck", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          fetchTrucks(); // Refresh the truck list
          setNewTruck({ make: "", model: "", year: "", status: "", description: "", image_file: null });
        } catch (error) {
          console.error("Error adding truck:", error);
        }
      };

    const handleRemoveTruck = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/delete-truck/${id}`);
            fetchTrucks();
        }
        catch (err) {
            console.error("Error removing truck:", err);
        }
    }

    return (
        <Container>
          <Typography variant="h4" gutterBottom>
            Truck Inventory
          </Typography>
    
          <Typography variant="h5" gutterBottom>
            Available Trucks
          </Typography>
          <Grid2 container spacing={3}>
            {trucks.map((truck) => (
              <Grid2 sx={{
                xs: 12,
                sm: 6,
                md: 3
              }} key={truck.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={truck.image_url}
                    alt={`${truck.make} ${truck.model}`}
                  />
                  <img src="" alt="" />
                  <CardContent>
                    <Typography variant="h6">
                      {truck.year} {truck.make} {truck.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {truck.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {truck.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleRemoveTruck(truck.id)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
    
          <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
            Add a New Truck
          </Typography>
          <Box
            component="form"
            
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
              marginTop: 2,
            }}
          >
            <TextField
            label="Year"
            type="number"
            value={newTruck.year}
            onChange={(e) => setNewTruck({ ...newTruck, year: e.target.value })}
            required
            />
            <TextField
              label="Make"
              value={newTruck.make}
              onChange={(e) => setNewTruck({ ...newTruck, make: e.target.value })}
              required
            />
            <TextField
              label="Model"
              value={newTruck.model}
              onChange={(e) => setNewTruck({ ...newTruck, model: e.target.value })}
              required
            />
            <FormControl required>
              <InputLabel>Status</InputLabel>
              <Select
                value={newTruck.status}
                onChange={(e) => setNewTruck({ ...newTruck, status: e.target.value })}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
                <MenuItem value="under_maintenance">Under Maintenance</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={newTruck.description}
              onChange={(e) => setNewTruck({ ...newTruck, description: e.target.value })}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<Upload />}
            >
              Upload Image
              <input
                type="file"
                name="image"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setNewTruck({ ...newTruck, image_file: e.target.files && e.target.files[0] })
                }
              />
            </Button>
            <Button onClick={handleAddTruck} type="submit" variant="contained" color="primary">
              Add Truck
            </Button>
          </Box>
        </Container>
      );
};