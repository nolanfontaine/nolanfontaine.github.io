import requests
import pandas as pd
import numpy as np
from twilio.rest import Client

# Récupérer les côtes (exemple avec une API tierce)
def get_odds():
    url = "https://api.oddsapi.io/v1/odds"
    params = {
        "api_key": "VOTRE_CLE_API",
        "sport": "football",
        "region": "eu",
        "mkt": "h2h"
    }
    response = requests.get(url, params=params)
    return response.json()

# Analyser les côtes et choisir le meilleur pari
def find_best_bet(odds_data):
    best_bet = None
    best_value = 0

    for match in odds_data:
        for bookmaker in match['bookmakers']:
            for outcome in bookmaker['outcomes']:
                cote = outcome['price']
                proba_estimee = 1 / cote  # Simplification, à remplacer par un modèle statistique
                value = (cote * proba_estimee) - 1

                if 2.8 <= cote <= 3.2 and value > best_value:
                    best_value = value
                    best_bet = {
                        "match": match['teams'],
                        "cote": cote,
                        "value": value
                    }

    return best_bet

# Envoyer le pari par SMS
def send_sms(bet):
    account_sid = 'VOTRE_SID_TWILIO'
    auth_token = 'VOTRE_TOKEN_TWILIO'
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=f"Pari du jour : {bet['match']} - Côte : {bet['cote']} - Value : {bet['value']}",
        from_='+1234567890',  # Votre numéro Twilio
        to='+0987654321'      # Votre numéro de téléphone
    )
    print("SMS envoyé !")

# Exécution du bot
if __name__ == "__main__":
    odds_data = get_odds()
    best_bet = find_best_bet(odds_data)
    if best_bet:
        send_sms(best_bet)
    else:
        print("Aucun pari trouvé aujourd'hui.")