import BlueCircle from "@/assets/home/blue-circle.svg";
import GreenCircle from "@/assets/home/green-circle.svg";
import RedCircle from "@/assets/home/red_circle.svg";
import YellowCircle from "@/assets/home/yellow-circle.svg";

import {
  PlantWaterStatus,
  PlantWaterStatusType,
} from "@/constants/garden/plantStatus";

interface BubbleProps {
  status: PlantWaterStatusType;
}
export const Bubble = ({ status }: BubbleProps) => {
  switch (status) {
    case PlantWaterStatus.EMPTY: {
      return <YellowCircle />;
    }
    case PlantWaterStatus.WATERED_RECENTLY: {
      return <GreenCircle />;
    }
    case PlantWaterStatus.WATERABLE: {
      return <BlueCircle />;
    }
    case PlantWaterStatus.WITHERED: {
      return <RedCircle />;
    }
  }
};
