import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IChainId, INetwork, INodeVersion} from "@/src/app/models/INetwork";

export const fetchTendermintParams = createAsyncThunk (
    'networks/fetchTendermintParams',
    async (network: INetwork, thunkAPI) => {
        try {
            const netResponse = await axios.get<IChainId>(`https://rpc.${network.name}.${network.type}.dteam.tech/net_info?`);
            const abciResponse = await axios.get<INodeVersion>(`https://rpc.${network.name}.${network.type}.dteam.tech/abci_info?`);

            const chainId = netResponse.data.result.peers[0].node_info.network
            const nodeVersion = abciResponse.data.result.response.version

            return {
                id: network.id,
                chainId: chainId,
                nodeVersion: nodeVersion
            }

        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)