import {
  removeEngagement,
  updateMetaInfo,
} from "@/utils/slices/engagementSlice";
import { RootState } from "@/utils/store";
import { keyValue } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";

const useEngagement = () => {
  const engagements = useSelector(
    (state: RootState) => state.engagement.engagements,
  );
  const dispatch = useDispatch();

  const getEngagementById = (id: number) => {
    return engagements.find((engagement) => engagement.id === id);
  };

  const deleteSelectedEngagements = (ids: number[]) => {
    if (
      window.confirm("Are you sure you want to delete selected engagements?")
    ) {
        console.log(ids)
      dispatch(removeEngagement(ids));
    }
  };

  const _updateMetaInfo = (data: keyValue, engagementId: number) => {
    dispatch(updateMetaInfo({ data, engagementId }));
  };

  return {
    engagements,
    getEngagementById,
    deleteSelectedEngagements,
    _updateMetaInfo,
  };
};

export default useEngagement;
