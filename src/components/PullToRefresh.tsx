import { IonRefresher, IonRefresherContent } from '@ionic/react';
import { arrowDownOutline } from 'ionicons/icons';
import React from 'react';

const PullToRefresh: React.FC<{ handleRefresh: any }> = (props) => {
  const handleRefresh = async (e: any) => {
    await props.handleRefresh().then(() => {
      e.target.complete(); // This completes the refreshing
    });
  };

  return (
    <IonRefresher
      slot="fixed"
      onIonRefresh={handleRefresh}
      pullFactor={0.5}
      pullMin={120}>
      <IonRefresherContent
        refreshingSpinner="lines"
        pullingText="Pull to sync with Zoho"
        refreshingText="Syncing..."
        pullingIcon={arrowDownOutline}
      />
    </IonRefresher>
  );
};

export default PullToRefresh;
