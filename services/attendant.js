const uuidv4 = require('uuid/v4');
const axios = require('axios');
const blip = require('./blip');
require("dotenv/config");

const getAllAttendants = async () => {
    // const client = await blip.getConnection();
    
    // const attendants = await client.sendCommand({
    //     id: uuidv4(),
    //     to: "postmaster@desk.msging.net",
    //     method: 'get',
    //     uri: "/attendants"
    // });

    const attendants = [
        'Emanuele.Lisboa@atento.com',
        'Lidia.Santos@atento.com',
        'Rosana.Bruno@atento.com',
        'Gabriel.Cearense@atento.com',
        'Arthur.Felix@atento.com',
        'Suelem.Silva@atento.com',
        'Natalia.Anastacio@atento.com',
        'Carla.Soares@atento.com',
        'Simone.Rodrigues@atento.com',
        'AnaCarolina.Duarte@atento.com',
        'Flavio.Januario@atento.com',
        'Giulia.Santos@atento.com',
        'Larissa.Taina@atento.com',
        'Pamela.Camilo@atento.com',
        'Keyla.Almeida@atento.com',
        'Liliane.Candido@atento.com',
        'nubia.diniz@atento.com',
        'Barbara.Soares@atento.com',
        'isteice.martins@atento.com',
        'Vitoria.Teixeira@atento.com',
        'Ivania.Ferreira@atento.com',
        'Leticia.Bicalho@atento.com',
        'Valeria.Carmo@atento.com',
        'Varley.Souza@atento.com',
        'angelica.bezerra@atento.com',
        'AnaPaula.Luiza@atento.com',
        'Michelline.Alves@atento.com',
        'Carolina.Lopes@atento.com',
        'Talita.Mara@atento.com',
        'Fernanda.Rezende@atento.com',
        'Mauricio.Ribeiro@atento.com',
        'Lorena.Pereira2@atento.com',
        'Yan.Santos@atento.com',
        'Adriana.DeMendonca@atento.com',
        'Wagner.Bruno@atento.com',
        'Geraldo.Alves@atento.com',
        'Apoliane.Santana@atento.com',
        'Apolo.Machado@atento.com',
        'Kawhane.Oliveira@atento.com',
        'Jose.SantosJunior@atento.com',
        'Sara.Valadares@atento.com',
        'Luana.Ferreira2@atento.com',
        'Joyce.Pereira2@atento.com',
        'Italo.Goncalves@atento.com',
        'Juliana.Cordeiro2@atento.com',
        'Janaina.Morais@atento.com',
        'Luiz.Gonzaga@atento.com',
        'Renyc.Zeferino@atento.com',
        'Alane.Viana@atento.com',
        'Bruno.Souza2@atento.com',
        'Thalita.Carvalho@atento.com',
        'Samuel.Ribeiro@atento.com',
        'Ruan.Marcio@atento.com',
        'Maria.SantanaSouza@atento.com',
        'Wellington.Schuchmann@atento.com',
        'Marcilio.Pego@atento.com',
        'Igor.Machado@atento.com',
        'Flavio.Argemiro@atento.com',
        'Fabiana.Guilherme@atento.com',
        'Cardinaly.Leal@atento.com',
        'thiago.diolindo@atento.com',
        'Julio.Gotelip@atento.com',
        'Samuel.Moura@atento.com',
        'Wander.Bruno@atento.com',
        'SERGIO.FERNANDES@atento.com',
        'Leovandeir.Souza@atento.com',
        'Debora.Teixeira@atento.com',
        'Daniela.Rosa@atento.com',
        'Simone.Batista@atento.com',
        'Andrey.Trigueiro@atento.com',
        'Antonio.Pereira@atento.com',
        'Ariane.Andrade@atento.com',
        'Danny.Goncalves@atento.com',
        'Gabriela.DeAlmeida@atento.com',
        'Iracema.Costa@atento.com',
        'Jaime.Santos@atento.com',
        'Joao.Abreu@atento.com',
        'Kethlen.Felisberto@atento.com',
        'Natalia.Demetrio@atento.com',
        'Ornella.Diniz@atento.com',
        'Paulo.Vinagre@atento.com',
        'Tassiane.Moreira@atento.com',
        'thiago.almeida@atento.com',
        'vania.ribeiro@atento.com',
        'ana.bsantos@atento.com',
        'Anderson.Lopes2@atento.com',
        'Guilherme.Mesquita@atento.com',
        'Iuri.Andrade@atento.com',
        'Raphael.Gomes@atento.com',
        'Thiago.Dias@atento.com',
        'Tiago.Batista2@atento.com',
        'Weuler.Carvalho@atento.com',
        'danilo.jesus@atento.com',
        'Thiago.Amorim@atento.com',
        'Luciana.Oliveira@atento.com',
        'Daniel.Batista@atento.com',
        'Janete.Souza@atento.com',
        'Vanessa.Gomes@atento.com',
        'Keity.alves@atento.com',
        'Bruna.deSouza@atento.com',
        'anete.silva@atento.com'
    ]

    attendants.forEach(async element => {
        await setAttendants(element);
    });
    return 200;
}

const setAttendants = async (element) => {
    const attendant = await axios({
        method: 'POST',
        url: process.env.COMMANDS_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTHORIZATION_KEY_RECIPIENT
        }, 
        data: {
            id: uuidv4(),
            to: "postmaster@desk.msging.net",
            method: "set",
            uri: "/attendants",
            type: "application/vnd.iris.desk.attendant+json",
            resource: {
                identity: encodeURIComponent(element)+"@blip.ai",
                teams: ["Default"]
            }
        }
    });

    return attendant;
}

module.exports = { getAllAttendants };
