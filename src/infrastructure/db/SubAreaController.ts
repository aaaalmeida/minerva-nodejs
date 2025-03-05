import { Driver, Session } from "neo4j-driver"
import { Neo4jConnection } from "./Neo4jConnection"
import IArea from "@domain/IArea"
import ISubarea from "@domain/ISubarea"

class SubAreaController {
    driver: Driver | null = null
    session: Session | null = null

    constructor(private dbConnection: Neo4jConnection) { }

    async init() {
        this.driver = await this.dbConnection.initDriver()
    }

    async insertSubArea(areaId: string, subarea: ISubarea) {
        try {
            if (!this.driver) await this.init()
            this.session = this.dbConnection.getWriteSession()
            const { records } = await this.session.run(
                'MATCH (area: Area {uuid: $areaId})' +
                'MERGE (subArea: Subarea {uuid: $subareaId})' +
                'SET subArea.name = $subareaName' +
                'MERGE (area)<-[:BELONGS_TO]-(subArea)' +
                'RETURN subArea',
                {
                    areaId: areaId,
                    subareaId: subarea.uuid,
                    subareaName: subarea.name
                }
            )
            return records.at(0)?.get("subArea").properties
        } catch (e) { throw e }
    }

    async deleteSubArea(id: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getWriteSession()
            await this.session.run(
                'MATCH (subarea: Subarea {uuid: $id}) DETACH DELETE subarea',
                { id: id }
            )
        } catch (e) {
            throw e
        }
    }

    async findSubAreaByElementID(id: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getReadSession()
            const { records } = await this.session.run(
                "MATCH (subarea:Area {uuid: $id}) RETURN subarea",
                { id: id }
            )
            return records.at(0)?.get("subarea").properties
        } catch (e) { throw e }
    }

    async matchAllSubArea() {
        try {
            if (!this.driver) await this.init()
            this.session = this.dbConnection.getReadSession()
            const { records } = await this.session.run("MATCH (subarea: Subarea) RETURN subarea")
            return records.map(item => item.get('subarea').properties);
        } catch (e) { throw e }
    }

    async matchAllSubAreaFromArea(id: string) {
        try {
            if (!this.driver) await this.init()
            this.session = this.dbConnection.getReadSession()
            const { records } = await this.session.run("MATCH (a: Area {uuid: $id}) RETURN subarea")
            return records.map(item => item.get('subarea').properties);
        } catch (e) { throw e }
    }

    async alterAreaProperties(area: Partial<IArea>, uuid: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getWriteSession()

            const props = Object.keys(area)
                .map((key) => `area.${key} = $${key}`)
                .join(", ")


            const query = `MATCH (area: Area {uuid: $uuid}) SET ${props} RETURN area`
            // console.log(props);
            // console.log(query);
            const params = { uuid, ...area }

            return await this.session.run(query, params)
        } catch (e) { throw e }
    }
}

export default SubAreaController