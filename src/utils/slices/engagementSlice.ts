import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Engagement, keyValue } from "../types";
import { engagements } from "../constants";

interface EngagementState {
  engagements: Engagement[];
}

const initialState: EngagementState = {
  engagements,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addEngagement: (state, action: PayloadAction<Engagement>) => {
      state.engagements.push(action.payload);
    },
    removeEngagement: (state, action: PayloadAction<number[]>) => {
      state.engagements = state.engagements.filter(
        (engagement) => !action.payload.includes(engagement.id),
      );
    },

    updateMetaInfo: (
      state,
      action: PayloadAction<{ data: keyValue; engagementId: number }>,
    ) => {
      const { data, engagementId } = action.payload;
      state.engagements = state.engagements.map((engagement) => {
        if (engagement.id === engagementId) {
          return {
            ...engagement,
            metaInfo: {
              ...engagement.metaInfo,
              ...data,
            },
          };
        }
        return engagement;
      });
    },

    deleteAllEngagements: (state) => {
      state.engagements = [];
    },
  },
});

export const {
  addEngagement,
  removeEngagement,
  deleteAllEngagements,
  updateMetaInfo,
} = postSlice.actions;
export default postSlice.reducer;
