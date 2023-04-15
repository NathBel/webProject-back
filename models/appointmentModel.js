const sql = require("../db.js");

// Constructor
const Appointment = function(appointment) {
    this.date = appointment.date;
    this.time = appointment.time;
    this.id_user = appointment.id_user;
    this.id_housing = appointment.id_housing;
    this.id_agent = appointment.id_agent;
    };

// Create and Save a new Appointment
Appointment.create = (newAppointment, result) => {
    sql.query("INSERT INTO appointment SET ?", newAppointment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created appointment: ", { id_appointment: res.insertId, ...newAppointment });
        result(null, { id_appointment: res.insertId, ...newAppointment });
    });
};

// Retrieve all Appointments from the database.
Appointment.getAll = result => {
    sql.query("SELECT * FROM appointment", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Find a single Appointment with an id
Appointment.findById = (appointmentId, result) => {
    sql.query(`SELECT * FROM appointment WHERE id_appointment = ${appointmentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // not found Appointment with the id
        result({ kind: "not_found" }, null);
    });
};

// Find Appointments with an id_user
Appointment.findByIdUser = (appointmentIdUser, result) => {
    sql.query(`SELECT * FROM appointment WHERE id_user = ${appointmentIdUser}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            // not found Appointment with the id
            result({ kind: "not_found" }, null);
        } else {
            result(null, res);
            return;
        }
        
    });
};

// Find Appointments with an id_agent
Appointment.findByIdAgent = (appointmentIdAgent, result) => {
    sql.query(`SELECT * FROM appointment WHERE id_agent = ${appointmentIdAgent}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            // not found Appointment with the id
            result({ kind: "not_found" }, null);
        } else {
            result(null, res);
            return;
        }
        
    });
};

// Update a Appointment identified by the id in the request
Appointment.updateById = (id, appointment, result) => {
    sql.query("UPDATE appointment SET date = ?, time = ?, id_user = ?, id_housing = ?, id_agent = ? WHERE id_appointment = ?", [appointment.date, appointment.time, appointment.id_user, appointment.id_housing, appointment.id_agent, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Appointment with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id_appointment: id, ...appointment });
    });
};

// Delete a Appointment with the specified id in the request
Appointment.remove = (id, result) => {
    sql.query("DELETE FROM appointment WHERE id_appointment = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Appointment with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted appointment with id: ", id);
        result(null, res);
    });
};

module .exports = Appointment;