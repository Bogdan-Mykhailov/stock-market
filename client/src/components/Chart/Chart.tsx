import {Line} from "react-chartjs-2";
import {defaults} from "chart.js/auto";
import {Share} from "../../types/Share.ts";
import {FC} from "react";
import {formatDateAndTime} from "../../utils/helpers.ts";
import {CharType} from "../../types/types.ts";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface Props {
  data: Share[];
  type: CharType;
}

export const Chart: FC<Props> = ({data, type}) => {
  const labels = type !== CharType.MAIN
    ? data.map(({last_trade_time}) => formatDateAndTime(last_trade_time))
    : data.map(({name}) => name);

  const dataset1 = type !== CharType.MAIN
    ? data.map(({change_percent}) => change_percent)
    : data.map(({price}) => price);

  const dataset2 = type !== CharType.MAIN
    ? data.map(({dividend}) => dividend)
    : data.map(({change}) => change);

  const dataset1Label = type !== CharType.MAIN
    ? 'Change Percent'
    : 'Price';

  const dataset2Label = type !== CharType.MAIN
    ? "Dividend"
    : 'Change';

  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: dataset1Label,
            data: dataset1,
            backgroundColor: '#1877f2',
            pointStyle: 'rectRot',
            borderWidth: 1
          },
          {
            label: dataset2Label,
            data: dataset2,
            backgroundColor: '#ea4335',
            pointStyle: 'rectRot',
            borderWidth: 1
          }
        ]
      }}
    />
  );
};
