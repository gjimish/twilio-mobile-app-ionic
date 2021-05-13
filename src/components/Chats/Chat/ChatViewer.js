import { useCallback } from 'react';
import './ChatViewer.css';
import {
  CellMeasurerCache,
  CellMeasurer,
  List,
  AutoSizer
} from 'react-virtualized';
import Message from './Message';
import { IonSkeletonText } from '@ionic/react';

const ChatViewer = ({ messages, isLoading }) => {
  const cache = new CellMeasurerCache({
    defaultHeight: 150,
    minHeight: 75
  });

  const chatRowRenderer = ({ index, style, key, parent }) => {
    const msg = messages[index];

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
        <div style={style}>
          <Message key={index} contents={msg} />
        </div>
      </CellMeasurer>
    );
  };

  const ChatList = useCallback(
    ({ width, rowRenderer, deferredMeasurementCache, rowHeight, height }) => (
      <List
        rowCount={messages.length}
        scrollToIndex={messages.length}
        width={width}
        height={height}
        deferredMeasurementCache={deferredMeasurementCache}
        rowHeight={rowHeight}
        rowRenderer={rowRenderer}
      />
    ),
    [messages]
  );

  return (
    <div className="chat__viewer">
      {isLoading && (
        <div className="ion-padding">
          <IonSkeletonText animated className="message__skeleton" />
          <IonSkeletonText
            animated
            className="message__skeleton message__skeleton__sender"
          />
          <IonSkeletonText animated className="message__skeleton" />
          <IonSkeletonText
            animated
            className="message__skeleton message__skeleton__sender"
          />
          <IonSkeletonText
            animated
            className="message__skeleton message__skeleton__sender"
          />
        </div>
      )}
      <AutoSizer>
        {({ width, height }) => (
          <ChatList
            rowRenderer={chatRowRenderer}
            width={width}
            height={height}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            overscanRowCount={3}
            scrollToAlignment="end"
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default ChatViewer;
