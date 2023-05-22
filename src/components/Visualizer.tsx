import styled from "@emotion/styled";
import CommandSection from "./CommandSection";
import Stack from "./Stack";
import StackInfo from "./StackInfo";
import KeyIcon from "./KeyIcon";
import ProgressBar from "./ProgressBar";
import Deque from 'double-ended-queue'

const KeyMap = {
    'key_w': 'slow down',
    'key_s': 'speed up',
    'key_a': 'prev command',
    'key_d': 'next command',
    'key_r': 'reset',
    'key_space': 'start / pause',
}

interface IProps {
    height: number;
    totalWidth: number;
    width: number;
    stackA: Deque<number>;
    stackB: Deque<number>;
    handlePlaying: React.MouseEventHandler<HTMLDivElement>;
    count: number;
    cmdCount: number;
    commands: string[];
    cur: number;
    second: number;
    changeSpeed: React.ChangeEventHandler<HTMLInputElement>;
    speed: number;
    playing: boolean
    clickReset: React.MouseEventHandler<HTMLDivElement>;
}

const Visualizer = (props: IProps) => {
    return (
        <VisualizerContainer {...props}>
            <Header>
                <ButtonContainer>
                    <Button onClick={props.handlePlaying}>{props.playing ? 'Stop' : 'Start'}</Button>
                    <Button onClick={props.clickReset}>Reset</Button>
                </ButtonContainer>
                <InputContainer>
                    <input
                        onChange={props.changeSpeed}
                        type="range"
                        value={props.speed}
                        min={1}
                        max={200}
                    />
                    <SpeedInfo>{props.speed} ms / cmd</SpeedInfo>
                </InputContainer>
                <CommandInfo>Command : <div>{props.cur}</div> / <div>{props.cmdCount}</div></CommandInfo>
            </Header>
            <KeyInfo>{Object.entries(KeyMap).map(([key, value]) => <KeyIcon key={key} name={key}
                                                                            info={value}/>)}</KeyInfo>
            <ProgressBar pos={props.cur / props.cmdCount * 100}/>
            <CommandSection commands={props.commands} cur={props.cur}/>
            <StackContainer>
                <Stack stack={props.stackA} count={props.count}/>
                <StackInfo name="Stack A" stack={props.stackA}/>
                <StackInfo name="Stack B" stack={props.stackB}/>
                <Stack stack={props.stackB} count={props.count}/>
            </StackContainer>
        </VisualizerContainer>
    );
};

const KeyInfo = styled.div`
  width: 100%;
  height: 60px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const InputContainer = styled.div`
  display: flex;
`;
const SpeedInfo = styled.div`
  margin-left: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  padding: 5px 10px;
  border-radius: 10px;
  border: 2px solid white;
  margin: 10px;
  cursor: pointer;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommandInfo = styled.div`
  width: 30%;
  text-align: center;

  & > div {
    width: 20%;
    display: inline-block;
  }
`;

const StackContainer = styled.div`
  width: 100%;
  height: 520px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const VisualizerContainer = styled.div<IProps>`
  width: ${(props) => `${props.totalWidth}px`};
  margin: 50px auto;
`;

export default Visualizer;
