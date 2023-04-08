const sql = require("../db.js");

// Constructor
const Agent = function(agent){
    this.firstname = agent.firstname;
    this.lastname = agent.lastname;
    this.phone = agent.phone;
    this.id_agency = agent.id_agency;
}

// Add  agent in the database
Agent.create = (newAgent, result) => {
    sql.query("INSERT INTO real_estate_agent SET ?", newAgent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created agent: ", { id_agent: res.insertId, ...newAgent });
        result(null, { id_agent: res.insertId, ...newAgent });
    });
};

//Get all agents in database
Agent.getAll = result => {
    sql.query("SELECT * FROM real_estate_agent", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("agents: ", res);
      result(null, res);
    });
  };

//Get agent by id
Agent.findById = (agentId, result) => {
    sql.query(`SELECT * FROM real_estate_agent WHERE id_agent = ${agentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found agent: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found agent with the id
        result({ kind: "not_found" }, null);
    });
};

//Get agent by agency
Agent.findByAgency = (agentAgency, result) => {
    sql.query(`SELECT * FROM real_estate_agent WHERE id_agency = '${agentAgency}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            // not found Agent working in this agency
            result({ kind: "not_found" }, null);
        }
        else{
            console.log("found agent: ", res);
            result(null, res);
            return;
        }
        
    });
};

//Update agent by id
Agent.updateById = (id, agent, result) => {
    sql.query("UPDATE real_estate_agent SET firstname = ?, lastname = ?, phone = ?, id_agency = ? WHERE id_agent = ?", [agent.firstname, agent.lastname, agent.phone, agent.id_agency, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Agent with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated agent: ", { id: id, ...agent });
        result(null, { id: id, ...agent });
    });
};

//Delete agent by id
Agent.remove = (id, result) => {
    sql.query("DELETE FROM real_estate_agent WHERE id_agent = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Agent with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted agent with id: ", id);
        result(null, res);
    });
};




module.exports = Agent;