import { Driver, Session } from "neo4j-driver"
import { Neo4jConnection } from "./Neo4jConnection"
import IArea from "@domain/IArea"

class AreaController {
    driver: Driver | null = null
    session: Session | null = null

    constructor(private dbConnection: Neo4jConnection) { }

    async init() {
        this.driver = await this.dbConnection.initDriver()
    }

    async insertArea(area: IArea) {
        try {
            if (!this.driver) await this.init()
            this.session = this.dbConnection.getWriteSession()
            const { records } = await this.session.run(
                'MERGE (newArea: Area $props) RETURN newArea',
                { props: area }
            )
            return records.at(0)?.get("newArea").properties
        } catch (e) { throw e }
    }

    async deleteArea(id: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getWriteSession()
            await this.session.run(
                'MATCH (area: Area {uuid: $id}) DETATCH DELETE area',
                { id: id }
            )
        } catch (e) {
            throw e
        }
    }

    async findAreaByElementID(id: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getReadSession()
            const { records } = await this.session.run(
                "MATCH (area:Area {uuid: $id}) RETURN area",
                { id: id }
            )
            return records.at(0)?.get("area").properties
        } catch (e) { throw e }
    }

    async matchAllArea() {
        try {
            if (!this.driver) await this.init()
            this.session = this.dbConnection.getReadSession()
            // const { records } = await this.session.run("MATCH (area: Area) RETURN area.uuid, area.name")
            const { records } = await this.session.run("MATCH (area: Area) RETURN area")
            // return records.map(r => {uuid: r._fields.uuid, name: r._fields.name})
            return records.map(item => item.get('area').properties);
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

export default AreaController