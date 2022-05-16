const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Build succeeded.`)
}

const politikerQuery = `
query {
    customApi {
        personlista {
        id
        person {
            hangar_guid
            sourceid
            intressent_id
            hangar_id
            fodd_ar
            kon
            efternamn
            tilltalsnamn
            sorteringsnamn
            iort
            parti
            valkrets
            status
            person_url_xml
            bild_url_80
            bild_url_192
            bild_url_max
            personuppdrag {
            uppdrag {
                organ_kod
                roll_kod
                ordningsnummer
                status
                typ
                from
                tom
                intressent_id
                hangar_id
                sortering
                organ_sortering
                uppdrag_rollsortering
                uppdrag_statussortering
            }
            }
            personuppgift {
            uppgift {
                kod
                typ
                intressent_id
                hangar_id
            }
            }
        }
        }
    }
}
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const individ = path.resolve(`src/pages/individ/index.js`)
  const politiker = path.resolve(`src/pages/politiker/index.js`)
  const PolitikerPagePromise = graphql(politikerQuery).then(result => {
      if (result.errors) {
          throw result.errors;
      }

      Object.keys(result.data.customApi.personlista.person).map((person, i) => {

        createPage({
          path: `individ/${result.data.customApi.personlista.person[person].intressent_id}`,
          component: individ,
          context: result.data.customApi.personlista.person[person],
        })

      })

        createPage({
            path: `politiker`,
            component: politiker,
            context: result.data.customApi.personlista.person,
        })
  })

  await Promise.all([PolitikerPagePromise]);
};
