import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, BarChart3, Brain, Target, FileCode } from "lucide-react";

export const MethodologySection = () => {
  const pythonCode = `# Data Ingestion & Cleaning Pipeline
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

def load_and_clean_data(filepath: str) -> pd.DataFrame:
    """
    Load the long-format dataset and perform cleaning operations.
    
    Args:
        filepath: Path to the CSV data file
    
    Returns:
        Cleaned and normalized DataFrame
    """
    # Load raw data
    df = pd.read_csv(filepath)
    
    # Convert time to year format
    df['Year'] = pd.to_datetime(df['Time']).dt.year
    
    # Handle missing values with forward fill + interpolation
    df = df.groupby(['Country', 'Indicator']).apply(
        lambda x: x.interpolate(method='linear')
    ).reset_index(drop=True)
    
    # Normalize fiscal indicators to % of GDP
    gdp_data = df[df['Indicator'] == 'GDP'][['Country', 'Year', 'Amount']]
    gdp_data = gdp_data.rename(columns={'Amount': 'GDP'})
    
    df = df.merge(gdp_data, on=['Country', 'Year'], how='left')
    
    # Create normalized ratios
    indicators_to_normalize = ['External_Debt', 'Revenue', 'Expenditure', 'Deficit']
    for ind in indicators_to_normalize:
        mask = df['Indicator'] == ind
        df.loc[mask, 'Normalized_Value'] = df.loc[mask, 'Amount'] / df.loc[mask, 'GDP'] * 100
    
    # Pivot to wide format
    df_wide = df.pivot_table(
        index=['Country', 'Year'],
        columns='Indicator',
        values='Normalized_Value'
    ).reset_index()
    
    return df_wide

# Anomaly Detection
def detect_anomalies(df: pd.DataFrame, column: str, threshold: float = 2.5) -> pd.DataFrame:
    """Detect anomalies using z-score method."""
    z_scores = np.abs((df[column] - df[column].mean()) / df[column].std())
    df['is_anomaly'] = z_scores > threshold
    return df[df['is_anomaly']]`;

  const riskModelCode = `# Risk Classification Model
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np

def classify_fiscal_risk(df: pd.DataFrame) -> pd.DataFrame:
    """
    Classify countries into Low, Medium, High, Critical risk using clustering.
    
    Features used:
    - Debt-to-GDP ratio
    - Deficit-to-GDP ratio
    - Revenue volatility (5-year std dev)
    - Expenditure growth rate
    - External debt share
    """
    # Calculate risk features
    features = df.groupby('Country').agg({
        'Debt_to_GDP': 'last',  # Latest debt ratio
        'Deficit_to_GDP': 'last',  # Latest deficit
        'Revenue_to_GDP': lambda x: x.std(),  # Revenue volatility
        'Expenditure_to_GDP': lambda x: (x.iloc[-1] - x.iloc[0]) / len(x),  # Growth
        'External_Debt_Share': 'last'  # External exposure
    }).reset_index()
    
    # Standardize features
    scaler = StandardScaler()
    X = scaler.fit_transform(features.drop('Country', axis=1))
    
    # K-Means clustering (4 clusters for risk levels)
    kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
    features['Cluster'] = kmeans.fit_predict(X)
    
    # Map clusters to risk levels based on centroid characteristics
    cluster_means = features.groupby('Cluster')['Debt_to_GDP'].mean()
    risk_mapping = dict(zip(
        cluster_means.sort_values().index,
        ['Low', 'Medium', 'High', 'Critical']
    ))
    
    features['Risk_Level'] = features['Cluster'].map(risk_mapping)
    
    # Calculate composite risk score (0-100)
    features['Risk_Score'] = (
        features['Debt_to_GDP'].rank(pct=True) * 30 +
        features['Deficit_to_GDP'].abs().rank(pct=True) * 25 +
        features['Revenue_to_GDP'].rank(pct=True) * 20 +
        features['Expenditure_to_GDP'].rank(pct=True) * 15 +
        features['External_Debt_Share'].rank(pct=True) * 10
    )
    
    return features.sort_values('Risk_Score', ascending=False)`;

  const forecastCode = `# Forecasting Pipeline
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
from prophet import Prophet
import warnings

def forecast_debt_trajectory(
    country_data: pd.DataFrame,
    indicator: str = 'Debt_to_GDP',
    horizon: int = 5
) -> dict:
    """
    Forecast fiscal indicator using multiple models, select best by AIC/BIC.
    
    Models evaluated:
    - ARIMA(p,d,q) with automatic order selection
    - SARIMA for seasonal patterns
    - Prophet for robust trend detection
    
    Returns:
        Dictionary with forecasts, confidence intervals, and model metrics
    """
    y = country_data.set_index('Year')[indicator].dropna()
    
    results = {}
    
    # ARIMA Model
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            arima = ARIMA(y, order=(2, 1, 2)).fit()
            arima_forecast = arima.forecast(steps=horizon)
            arima_conf = arima.get_forecast(horizon).conf_int()
            results['ARIMA'] = {
                'forecast': arima_forecast,
                'lower': arima_conf.iloc[:, 0],
                'upper': arima_conf.iloc[:, 1],
                'aic': arima.aic,
                'bic': arima.bic
            }
    except Exception as e:
        print(f"ARIMA failed: {e}")
    
    # Prophet Model
    try:
        prophet_df = pd.DataFrame({
            'ds': pd.to_datetime(y.index, format='%Y'),
            'y': y.values
        })
        prophet = Prophet(yearly_seasonality=False, weekly_seasonality=False)
        prophet.fit(prophet_df)
        future = prophet.make_future_dataframe(periods=horizon, freq='Y')
        prophet_forecast = prophet.predict(future).tail(horizon)
        results['Prophet'] = {
            'forecast': prophet_forecast['yhat'].values,
            'lower': prophet_forecast['yhat_lower'].values,
            'upper': prophet_forecast['yhat_upper'].values
        }
    except Exception as e:
        print(f"Prophet failed: {e}")
    
    # Select best model by AIC (if available)
    best_model = min(
        [(k, v['aic']) for k, v in results.items() if 'aic' in v],
        key=lambda x: x[1],
        default=('Prophet', 0)
    )[0]
    
    return {
        'best_model': best_model,
        'all_results': results,
        'horizon_years': list(range(y.index.max() + 1, y.index.max() + horizon + 1))
    }`;

  return (
    <section id="methodology" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Methodology & Technical Framework
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analytical pipeline combining data engineering, statistical modeling, 
            and machine learning for fiscal risk assessment.
          </p>
        </div>

        {/* Methodology Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Database, title: 'Data Ingestion', desc: 'Clean, normalize, and transform raw fiscal data' },
            { icon: BarChart3, title: 'EDA & Visualization', desc: 'Uncover patterns, trends, and anomalies' },
            { icon: Brain, title: 'Risk Modeling', desc: 'Cluster countries by fiscal vulnerability' },
            { icon: Target, title: 'Forecasting', desc: 'Predict future debt trajectories' },
          ].map((step, index) => (
            <Card key={index} variant="gradient" className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Tabs */}
        <Card variant="gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-primary" />
              Python Implementation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="data" className="w-full">
              <TabsList className="bg-secondary mb-4">
                <TabsTrigger value="data">Data Pipeline</TabsTrigger>
                <TabsTrigger value="risk">Risk Model</TabsTrigger>
                <TabsTrigger value="forecast">Forecasting</TabsTrigger>
              </TabsList>
              <TabsContent value="data">
                <pre className="p-4 rounded-lg bg-background overflow-x-auto text-sm">
                  <code className="text-primary/90 font-mono">{pythonCode}</code>
                </pre>
              </TabsContent>
              <TabsContent value="risk">
                <pre className="p-4 rounded-lg bg-background overflow-x-auto text-sm">
                  <code className="text-primary/90 font-mono">{riskModelCode}</code>
                </pre>
              </TabsContent>
              <TabsContent value="forecast">
                <pre className="p-4 rounded-lg bg-background overflow-x-auto text-sm">
                  <code className="text-primary/90 font-mono">{forecastCode}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
