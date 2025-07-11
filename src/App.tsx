import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Progress } from './components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { 
  Zap, 
  Shield, 
  Trophy, 
  Coins, 
  Swords, 
  Star,
  ShoppingCart,
  Target,
  Crown,
  Flame,
  Gem,
  Check,
  CreditCard,
  DollarSign,
  Wallet
} from 'lucide-react'
import toast from 'react-hot-toast'

// VIP Benefits Data - 100 Amazing Benefits!
const VIP_BENEFITS = [
  // Combat Bonuses (1-15)
  { id: 1, name: '50% Extra Damage', category: 'Combat', icon: '⚔️', description: 'Deal 50% more damage in all fights' },
  { id: 2, name: 'Double Health Regeneration', category: 'Combat', icon: '❤️', description: 'Heal twice as fast between fights' },
  { id: 3, name: 'Critical Strike Chance', category: 'Combat', icon: '💥', description: '15% chance to deal double damage' },
  { id: 4, name: 'Berserker Mode', category: 'Combat', icon: '🔥', description: 'Gain attack speed when health is low' },
  { id: 5, name: 'Shield Mastery', category: 'Combat', icon: '🛡️', description: '25% chance to block incoming damage' },
  { id: 6, name: 'Combo Multiplier', category: 'Combat', icon: '🌟', description: 'Build combo streaks for bonus damage' },
  { id: 7, name: 'Victory Healing', category: 'Combat', icon: '✨', description: 'Restore 50% health after winning fights' },
  { id: 8, name: 'Rage Mode', category: 'Combat', icon: '😡', description: 'Unlimited energy for 30 seconds' },
  { id: 9, name: 'Perfect Counter', category: 'Combat', icon: '🎯', description: 'Counter-attack for massive damage' },
  { id: 10, name: 'Adrenaline Rush', category: 'Combat', icon: '⚡', description: 'Move faster during combat' },
  { id: 11, name: 'Iron Will', category: 'Combat', icon: '💪', description: 'Immunity to status effects' },
  { id: 12, name: 'Lucky Strikes', category: 'Combat', icon: '🍀', description: 'Random bonus damage multipliers' },
  { id: 13, name: 'Endurance Boost', category: 'Combat', icon: '🏃', description: 'Fight longer without getting tired' },
  { id: 14, name: 'Intimidation', category: 'Combat', icon: '😈', description: 'Enemies deal 20% less damage' },
  { id: 15, name: 'Champion\'s Spirit', category: 'Combat', icon: '👑', description: 'Comeback mechanic when behind' },

  // Coin & Economy (16-30)
  { id: 16, name: 'Triple Coin Rewards', category: 'Economy', icon: '💰', description: 'Earn 3x coins from all fights' },
  { id: 17, name: 'Daily Coin Bonus', category: 'Economy', icon: '🎁', description: 'Get 1000 coins every day' },
  { id: 18, name: 'Coin Magnet', category: 'Economy', icon: '🧲', description: 'Automatically collect bonus coins' },
  { id: 19, name: 'Investment Returns', category: 'Economy', icon: '📈', description: 'Earn 5% interest on saved coins' },
  { id: 20, name: 'Lucky Jackpots', category: 'Economy', icon: '🎰', description: 'Random massive coin bonuses' },
  { id: 21, name: 'Sponsorship Deals', category: 'Economy', icon: '🤝', description: 'Get paid for wearing gear' },
  { id: 22, name: 'Treasure Hunter', category: 'Economy', icon: '🗺️', description: 'Find hidden coin caches' },
  { id: 23, name: 'VIP Salary', category: 'Economy', icon: '💼', description: 'Earn coins even when offline' },
  { id: 24, name: 'Coin Multiplier Stacks', category: 'Economy', icon: '📊', description: 'Stack bonuses for huge rewards' },
  { id: 25, name: 'Royal Treasury', category: 'Economy', icon: '👑', description: 'Access to exclusive coin vaults' },
  { id: 26, name: 'Golden Touch', category: 'Economy', icon: '✨', description: 'Everything you touch gives coins' },
  { id: 27, name: 'Merchant Discounts', category: 'Economy', icon: '🏪', description: '50% off all shop purchases' },
  { id: 28, name: 'Auction House Access', category: 'Economy', icon: '🔨', description: 'Buy and sell rare items' },
  { id: 29, name: 'Coin Rain Events', category: 'Economy', icon: '🌧️', description: 'Special coin shower events' },
  { id: 30, name: 'Fortune Teller', category: 'Economy', icon: '🔮', description: 'Predict best times to earn coins' },

  // Exclusive Items (31-45)
  { id: 31, name: 'Diamond Gloves', category: 'Exclusive', icon: '💎', description: 'Ultra-rare gloves with 500 damage' },
  { id: 32, name: 'Legendary Warrior', category: 'Exclusive', icon: '🏆', description: 'Exclusive character with 1000 health' },
  { id: 33, name: 'Mythic Equipment Set', category: 'Exclusive', icon: '🛡️', description: 'Complete mythic gear collection' },
  { id: 34, name: 'VIP Locker Room', category: 'Exclusive', icon: '🏠', description: 'Personal space for gear storage' },
  { id: 35, name: 'Golden Championship Belt', category: 'Exclusive', icon: '🥇', description: 'Show off your VIP status' },
  { id: 36, name: 'Platinum Membership Card', category: 'Exclusive', icon: '💳', description: 'Access to VIP-only areas' },
  { id: 37, name: 'Custom Ring Entrance', category: 'Exclusive', icon: '🎭', description: 'Personalized fight entrance' },
  { id: 38, name: 'VIP Training Dummy', category: 'Exclusive', icon: '🎯', description: 'Practice with exclusive equipment' },
  { id: 39, name: 'Royal Throne', category: 'Exclusive', icon: '👑', description: 'Sit in style between fights' },
  { id: 40, name: 'Diamond-Encrusted Shorts', category: 'Exclusive', icon: '💎', description: 'Exclusive VIP fighting gear' },
  { id: 41, name: 'VIP Gym Membership', category: 'Exclusive', icon: '🏋️', description: 'Access to premium training' },
  { id: 42, name: 'Personal Boxing Coach', category: 'Exclusive', icon: '👨‍🏫', description: 'Get expert fighting tips' },
  { id: 43, name: 'Luxury Sports Car', category: 'Exclusive', icon: '🏎️', description: 'Arrive in style' },
  { id: 44, name: 'Private Jet Access', category: 'Exclusive', icon: '✈️', description: 'Travel to exclusive fights' },
  { id: 45, name: 'VIP Penthouse Suite', category: 'Exclusive', icon: '🏢', description: 'Luxurious living quarters' },

  // Special Abilities (46-60)
  { id: 46, name: 'Time Manipulation', category: 'Special', icon: '⏰', description: 'Slow down time during fights' },
  { id: 47, name: 'Teleportation', category: 'Special', icon: '⚡', description: 'Instantly dodge attacks' },
  { id: 48, name: 'Mind Reading', category: 'Special', icon: '🧠', description: 'Predict opponent moves' },
  { id: 49, name: 'Energy Blasts', category: 'Special', icon: '💥', description: 'Shoot energy projectiles' },
  { id: 50, name: 'Healing Factor', category: 'Special', icon: '🔄', description: 'Regenerate health during fights' },
  { id: 51, name: 'Super Speed', category: 'Special', icon: '🏃', description: 'Move at lightning speed' },
  { id: 52, name: 'Invisibility Cloak', category: 'Special', icon: '👻', description: 'Become invisible to enemies' },
  { id: 53, name: 'Force Field', category: 'Special', icon: '🛡️', description: 'Create protective barriers' },
  { id: 54, name: 'Clone Army', category: 'Special', icon: '👥', description: 'Create copies of yourself' },
  { id: 55, name: 'Elemental Powers', category: 'Special', icon: '🌊', description: 'Control fire, ice, and lightning' },
  { id: 56, name: 'Gravity Control', category: 'Special', icon: '🌌', description: 'Manipulate gravity fields' },
  { id: 57, name: 'Dimension Portal', category: 'Special', icon: '🌀', description: 'Travel between dimensions' },
  { id: 58, name: 'Phoenix Resurrection', category: 'Special', icon: '🔥', description: 'Come back from defeat' },
  { id: 59, name: 'Reality Warping', category: 'Special', icon: '🌈', description: 'Bend reality to your will' },
  { id: 60, name: 'God Mode', category: 'Special', icon: '😇', description: 'Temporary invincibility' },

  // Social Features (61-75)
  { id: 61, name: 'VIP Chat Badge', category: 'Social', icon: '💬', description: 'Special badge in chat' },
  { id: 62, name: 'Private Tournaments', category: 'Social', icon: '🏆', description: 'Host exclusive tournaments' },
  { id: 63, name: 'Fan Club Access', category: 'Social', icon: '⭐', description: 'Interact with your fans' },
  { id: 64, name: 'Social Media Manager', category: 'Social', icon: '📱', description: 'Auto-post your victories' },
  { id: 65, name: 'VIP Friends List', category: 'Social', icon: '👥', description: 'Expanded friends capacity' },
  { id: 66, name: 'Exclusive Emotes', category: 'Social', icon: '😎', description: 'VIP-only celebration moves' },
  { id: 67, name: 'Voice Chat Priority', category: 'Social', icon: '🎤', description: 'Crystal clear voice chat' },
  { id: 68, name: 'Custom Profile Theme', category: 'Social', icon: '🎨', description: 'Personalize your profile' },
  { id: 69, name: 'Livestream Integration', category: 'Social', icon: '📺', description: 'Stream your fights live' },
  { id: 70, name: 'VIP Community Forum', category: 'Social', icon: '💭', description: 'Exclusive discussion boards' },
  { id: 71, name: 'Mentorship Program', category: 'Social', icon: '🤝', description: 'Help new players' },
  { id: 72, name: 'Celebrity Matches', category: 'Social', icon: '🌟', description: 'Fight against famous boxers' },
  { id: 73, name: 'Meet & Greet Events', category: 'Social', icon: '🎭', description: 'Exclusive VIP events' },
  { id: 74, name: 'Autograph Sessions', category: 'Social', icon: '✍️', description: 'Sign autographs for fans' },
  { id: 75, name: 'VIP Merchandise', category: 'Social', icon: '👕', description: 'Exclusive branded gear' },

  // Quality of Life (76-90)
  { id: 76, name: 'Auto-Fight Mode', category: 'Quality', icon: '🤖', description: 'AI fights for you' },
  { id: 77, name: 'Instant Healing', category: 'Quality', icon: '⚡', description: 'No waiting for health recovery' },
  { id: 78, name: 'Skip Animations', category: 'Quality', icon: '⏭️', description: 'Fast-forward through fights' },
  { id: 79, name: 'Unlimited Storage', category: 'Quality', icon: '📦', description: 'Never run out of space' },
  { id: 80, name: 'Quick Travel', category: 'Quality', icon: '🚀', description: 'Instant location changes' },
  { id: 81, name: 'Advanced Statistics', category: 'Quality', icon: '📊', description: 'Detailed performance metrics' },
  { id: 82, name: 'Custom Hotkeys', category: 'Quality', icon: '⌨️', description: 'Personalized controls' },
  { id: 83, name: 'Multi-Tab Interface', category: 'Quality', icon: '📱', description: 'Manage multiple fights' },
  { id: 84, name: 'Smart Notifications', category: 'Quality', icon: '🔔', description: 'Intelligent alerts' },
  { id: 85, name: 'Cloud Save Sync', category: 'Quality', icon: '☁️', description: 'Never lose progress' },
  { id: 86, name: 'Offline Mode', category: 'Quality', icon: '📶', description: 'Play without internet' },
  { id: 87, name: 'Performance Optimizer', category: 'Quality', icon: '⚡', description: 'Buttery smooth gameplay' },
  { id: 88, name: 'Custom UI Themes', category: 'Quality', icon: '🎨', description: 'Personalize your interface' },
  { id: 89, name: 'Voice Commands', category: 'Quality', icon: '🗣️', description: 'Control with your voice' },
  { id: 90, name: 'Gesture Controls', category: 'Quality', icon: '👋', description: 'Motion-based controls' },

  // Ultimate Perks (91-100)
  { id: 91, name: 'Developer Chat Access', category: 'Ultimate', icon: '💻', description: 'Direct line to developers' },
  { id: 92, name: 'Beta Feature Access', category: 'Ultimate', icon: '🔬', description: 'Test new features first' },
  { id: 93, name: 'Custom Game Modes', category: 'Ultimate', icon: '🎮', description: 'Create your own game modes' },
  { id: 94, name: 'Unlimited Undos', category: 'Ultimate', icon: '↩️', description: 'Reverse any mistake' },
  { id: 95, name: 'Time Travel Save States', category: 'Ultimate', icon: '⏰', description: 'Go back to any moment' },
  { id: 96, name: 'Reality Editor', category: 'Ultimate', icon: '🛠️', description: 'Modify game rules' },
  { id: 97, name: 'Quantum Entanglement', category: 'Ultimate', icon: '🌌', description: 'Exist in multiple states' },
  { id: 98, name: 'Omnipotence Mode', category: 'Ultimate', icon: '🔮', description: 'Ultimate power over everything' },
  { id: 99, name: 'Immortality', category: 'Ultimate', icon: '♾️', description: 'Never lose, never die' },
  { id: 100, name: 'Universe Creator', category: 'Ultimate', icon: '🌍', description: 'Create your own boxing universe' }
]

const VIP_PRICE = 1200000
const VIP_DURATION = 30 // days

// Coin Packages for Purchase
const COIN_PACKAGES = [
  {
    id: 1,
    name: 'Starter Pack',
    coins: 1000,
    price: 0.99,
    icon: '🪙',
    color: 'bg-gradient-to-r from-gray-500 to-gray-600',
    popular: false,
    bonus: 0
  },
  {
    id: 2,
    name: 'Fighter Pack',
    coins: 5000,
    price: 4.99,
    icon: '💰',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    popular: false,
    bonus: 500
  },
  {
    id: 3,
    name: 'Champion Pack',
    coins: 12000,
    price: 9.99,
    icon: '🏆',
    color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    popular: true,
    bonus: 2000
  },
  {
    id: 4,
    name: 'Legend Pack',
    coins: 25000,
    price: 19.99,
    icon: '⭐',
    color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    popular: false,
    bonus: 5000
  },
  {
    id: 5,
    name: 'Elite Pack',
    coins: 60000,
    price: 49.99,
    icon: '👑',
    color: 'bg-gradient-to-r from-red-500 to-red-600',
    popular: false,
    bonus: 15000
  },
  {
    id: 6,
    name: 'Ultimate Pack',
    coins: 150000,
    price: 99.99,
    icon: '💎',
    color: 'bg-gradient-to-r from-pink-500 to-pink-600',
    popular: false,
    bonus: 50000
  }
]

// Game data
const OPPONENTS = [
  { id: 1, name: 'Rookie Rob', difficulty: 1, reward: 10, health: 100, icon: '👶' },
  { id: 2, name: 'Brawler Bob', difficulty: 2, reward: 25, health: 150, icon: '🤜' },
  { id: 3, name: 'Iron Mike', difficulty: 3, reward: 50, health: 200, icon: '🥊' },
  { id: 4, name: 'Thunder Tom', difficulty: 4, reward: 100, health: 300, icon: '⚡' },
  { id: 5, name: 'Steel Sam', difficulty: 5, reward: 200, health: 400, icon: '🛡️' },
  { id: 6, name: 'Lightning Luke', difficulty: 6, reward: 350, health: 500, icon: '🌩️' },
  { id: 7, name: 'Titan Terry', difficulty: 7, reward: 500, health: 750, icon: '🏔️' },
  { id: 8, name: 'Champion Charlie', difficulty: 8, reward: 1000, health: 1000, icon: '👑' },
]

const GLOVES = [
  { id: 1, name: 'Leather Basics', price: 50, damage: 10, rarity: 'common', color: 'bg-gray-500' },
  { id: 2, name: 'Speed Demons', price: 150, damage: 15, rarity: 'common', color: 'bg-blue-500' },
  { id: 3, name: 'Power Punch', price: 300, damage: 25, rarity: 'rare', color: 'bg-green-500' },
  { id: 4, name: 'Lightning Strike', price: 600, damage: 35, rarity: 'rare', color: 'bg-yellow-500' },
  { id: 5, name: 'Iron Fist', price: 1200, damage: 50, rarity: 'epic', color: 'bg-purple-500' },
  { id: 6, name: 'Dragon Claws', price: 2500, damage: 75, rarity: 'epic', color: 'bg-red-500' },
  { id: 7, name: 'Thunderstorm', price: 5000, damage: 100, rarity: 'legendary', color: 'bg-indigo-500' },
  { id: 8, name: 'Cosmic Crusher', price: 10000, damage: 150, rarity: 'legendary', color: 'bg-pink-500' },
]

const CHARACTERS = [
  { id: 1, name: 'Street Fighter', price: 100, health: 120, icon: '🥊', rarity: 'common' },
  { id: 2, name: 'Gym Warrior', price: 250, health: 140, icon: '💪', rarity: 'common' },
  { id: 3, name: 'Ring Master', price: 500, health: 160, icon: '🎯', rarity: 'rare' },
  { id: 4, name: 'Champion', price: 1000, health: 200, icon: '🏆', rarity: 'rare' },
  { id: 5, name: 'Legend', price: 2000, health: 250, icon: '⭐', rarity: 'epic' },
  { id: 6, name: 'Titan', price: 4000, health: 300, icon: '🛡️', rarity: 'epic' },
  { id: 7, name: 'Godlike', price: 8000, health: 400, icon: '👑', rarity: 'legendary' },
  { id: 8, name: 'Mythic Beast', price: 15000, health: 500, icon: '🐉', rarity: 'legendary' },
]

const RARITY_COLORS = {
  common: 'border-gray-400 bg-gray-50',
  rare: 'border-blue-400 bg-blue-50',
  epic: 'border-purple-400 bg-purple-50',
  legendary: 'border-yellow-400 bg-yellow-50 shadow-yellow-200 shadow-lg'
}

function App() {
  const [coins, setCoins] = useState(100)
  const [selectedGlove, setSelectedGlove] = useState(GLOVES[0])
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0])
  const [playerHealth, setPlayerHealth] = useState(selectedCharacter.health)
  const [maxHealth, setMaxHealth] = useState(selectedCharacter.health)
  const [ownedGloves, setOwnedGloves] = useState([GLOVES[0]])
  const [ownedCharacters, setOwnedCharacters] = useState([CHARACTERS[0]])
  const [currentOpponent, setCurrentOpponent] = useState(OPPONENTS[0])
  const [opponentHealth, setOpponentHealth] = useState(OPPONENTS[0].health)
  const [isFighting, setIsFighting] = useState(false)
  const [gameStats, setGameStats] = useState({ fights: 0, wins: 0, totalEarned: 0 })
  const [hasVIP, setHasVIP] = useState(false)
  const [vipExpiry, setVipExpiry] = useState<Date | null>(null)
  const [selectedBenefitCategory, setSelectedBenefitCategory] = useState('All')

  // Update player health when character changes
  useEffect(() => {
    setPlayerHealth(selectedCharacter.health)
    setMaxHealth(selectedCharacter.health)
  }, [selectedCharacter])

  const buyItem = (item: typeof GLOVES[0] | typeof CHARACTERS[0], type: 'glove' | 'character') => {
    if (coins >= item.price) {
      setCoins(coins - item.price)
      if (type === 'glove') {
        setOwnedGloves([...ownedGloves, item])
      } else {
        setOwnedCharacters([...ownedCharacters, item])
      }
      toast.success(`Purchased ${item.name}!`)
    } else {
      toast.error('Not enough coins!')
    }
  }

  const buyVIP = () => {
    if (coins >= VIP_PRICE) {
      setCoins(coins - VIP_PRICE)
      setHasVIP(true)
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + VIP_DURATION)
      setVipExpiry(expiryDate)
      toast.success('🎉 VIP Pass Activated! Welcome to the elite club!')
    } else {
      toast.error(`Not enough coins! Need ${VIP_PRICE.toLocaleString()} coins`)
    }
  }

  const buyCoinPackage = (coinPackage: typeof COIN_PACKAGES[0]) => {
    // In a real app, this would integrate with payment processing
    // For demo purposes, we'll simulate the purchase
    const totalCoins = coinPackage.coins + coinPackage.bonus
    setCoins(coins + totalCoins)
    setGameStats(prev => ({ ...prev, totalEarned: prev.totalEarned + totalCoins }))
    toast.success(`🎉 Purchased ${coinPackage.name}! Received ${totalCoins.toLocaleString()} coins!`)
  }

  const getVIPTimeLeft = () => {
    if (!vipExpiry) return ''
    const now = new Date()
    const diff = vipExpiry.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return `${days} days remaining`
  }

  const categories = ['All', 'Combat', 'Economy', 'Exclusive', 'Special', 'Social', 'Quality', 'Ultimate']
  const filteredBenefits = selectedBenefitCategory === 'All' 
    ? VIP_BENEFITS 
    : VIP_BENEFITS.filter(b => b.category === selectedBenefitCategory)

  const fight = async () => {
    if (isFighting || playerHealth <= 0) return
    
    setIsFighting(true)
    setGameStats(prev => ({ ...prev, fights: prev.fights + 1 }))
    
    // Simulate fight
    let playerHp = playerHealth
    let opponentHp = opponentHealth
    
    while (playerHp > 0 && opponentHp > 0) {
      // Player attacks
      const playerDamage = selectedGlove.damage + Math.floor(Math.random() * 20)
      opponentHp -= playerDamage
      
      if (opponentHp <= 0) break
      
      // Opponent attacks
      const opponentDamage = currentOpponent.difficulty * 10 + Math.floor(Math.random() * 15)
      playerHp -= opponentDamage
      
      // Add delay for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    setPlayerHealth(Math.max(0, playerHp))
    setOpponentHealth(Math.max(0, opponentHp))
    
    if (playerHp > 0) {
      // Player wins
      setCoins(coins + currentOpponent.reward)
      setGameStats(prev => ({ 
        ...prev, 
        wins: prev.wins + 1, 
        totalEarned: prev.totalEarned + currentOpponent.reward 
      }))
      toast.success(`Victory! Earned ${currentOpponent.reward} coins!`)
      
      // Reset for next fight
      setTimeout(() => {
        setOpponentHealth(currentOpponent.health)
        setIsFighting(false)
      }, 2000)
    } else {
      // Player loses
      toast.error('Defeat! Rest and try again.')
      setTimeout(() => {
        setPlayerHealth(maxHealth)
        setOpponentHealth(currentOpponent.health)
        setIsFighting(false)
      }, 2000)
    }
  }

  const selectOpponent = (opponent: typeof OPPONENTS[0]) => {
    setCurrentOpponent(opponent)
    setOpponentHealth(opponent.health)
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-4 h-4 text-gray-500" />
      case 'rare': return <Star className="w-4 h-4 text-blue-500" />
      case 'epic': return <Star className="w-4 h-4 text-purple-500" />
      case 'legendary': return <Star className="w-4 h-4 text-yellow-500" />
      default: return <Star className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            Boxing Champion
          </h1>
          <p className="text-xl text-gray-300">Coin Collector Game</p>
          {hasVIP && (
            <Badge className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold">
              ⭐ VIP MEMBER - {getVIPTimeLeft()}
            </Badge>
          )}
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Coins className="w-6 h-6 text-white mr-2" />
                <span className="text-2xl font-bold text-white">{coins.toLocaleString()}</span>
              </div>
              <p className="text-yellow-100 text-sm">Coins</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-red-500 to-red-600 border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-white mr-2" />
                <span className="text-2xl font-bold text-white">{gameStats.wins}</span>
              </div>
              <p className="text-red-100 text-sm">Wins</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Swords className="w-6 h-6 text-white mr-2" />
                <span className="text-2xl font-bold text-white">{gameStats.fights}</span>
              </div>
              <p className="text-blue-100 text-sm">Fights</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-white mr-2" />
                <span className="text-2xl font-bold text-white">{gameStats.totalEarned}</span>
              </div>
              <p className="text-green-100 text-sm">Total Earned</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Game Area */}
        <Tabs defaultValue="fight" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-800 border-slate-600">
            <TabsTrigger value="fight" className="text-white data-[state=active]:bg-red-600">
              <Flame className="w-4 h-4 mr-2" />
              Fight
            </TabsTrigger>
            <TabsTrigger value="shop" className="text-white data-[state=active]:bg-blue-600">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop
            </TabsTrigger>
            <TabsTrigger value="coinshop" className="text-white data-[state=active]:bg-green-600">
              <CreditCard className="w-4 h-4 mr-2" />
              Coins
            </TabsTrigger>
            <TabsTrigger value="inventory" className="text-white data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="vip" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600">
              <Gem className="w-4 h-4 mr-2" />
              VIP
            </TabsTrigger>
          </TabsList>

          {/* Fight Tab */}
          <TabsContent value="fight" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Fighter vs Opponent */}
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white text-center">Battle Arena</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Player */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{selectedCharacter.icon}</div>
                    <h3 className="text-lg font-semibold text-white">{selectedCharacter.name}</h3>
                    <p className="text-gray-300 text-sm">Equipped: {selectedGlove.name}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>Health</span>
                        <span>{playerHealth}/{maxHealth}</span>
                      </div>
                      <Progress value={(playerHealth / maxHealth) * 100} className="h-3" />
                    </div>
                  </div>

                  {/* VS */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">VS</div>
                  </div>

                  {/* Opponent */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{currentOpponent.icon}</div>
                    <h3 className="text-lg font-semibold text-white">{currentOpponent.name}</h3>
                    <p className="text-gray-300 text-sm">Level {currentOpponent.difficulty}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>Health</span>
                        <span>{opponentHealth}/{currentOpponent.health}</span>
                      </div>
                      <Progress value={(opponentHealth / currentOpponent.health) * 100} className="h-3" />
                    </div>
                  </div>

                  {/* Fight Button */}
                  <Button 
                    onClick={fight} 
                    disabled={isFighting || playerHealth <= 0}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 text-lg"
                  >
                    {isFighting ? 'Fighting...' : playerHealth <= 0 ? 'Knocked Out!' : 'FIGHT!'}
                  </Button>
                </CardContent>
              </Card>

              {/* Opponent Selection */}
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white">Choose Your Opponent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {OPPONENTS.map((opponent) => (
                      <motion.div
                        key={opponent.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={currentOpponent.id === opponent.id ? "default" : "outline"}
                          onClick={() => selectOpponent(opponent)}
                          className={`w-full h-auto p-3 flex flex-col items-center space-y-2 ${
                            currentOpponent.id === opponent.id 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                          }`}
                        >
                          <div className="text-2xl">{opponent.icon}</div>
                          <div className="text-center">
                            <div className="font-medium text-sm">{opponent.name}</div>
                            <div className="text-xs opacity-75">
                              Level {opponent.difficulty} • {opponent.reward} coins
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Shop Tab */}
          <TabsContent value="shop" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Gloves Shop */}
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Boxing Gloves
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {GLOVES.map((glove) => {
                      const owned = ownedGloves.some(g => g.id === glove.id)
                      return (
                        <motion.div
                          key={glove.id}
                          whileHover={{ scale: 1.02 }}
                          className={`border rounded-lg p-3 ${RARITY_COLORS[glove.rarity as keyof typeof RARITY_COLORS]}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full ${glove.color}`}></div>
                              <div>
                                <div className="font-medium flex items-center">
                                  {glove.name}
                                  {getRarityIcon(glove.rarity)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {glove.damage} damage
                                </div>
                              </div>
                            </div>
                            {owned ? (
                              <Badge variant="secondary">Owned</Badge>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => buyItem(glove, 'glove')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {glove.price} coins
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Characters Shop */}
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Characters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {CHARACTERS.map((character) => {
                      const owned = ownedCharacters.some(c => c.id === character.id)
                      return (
                        <motion.div
                          key={character.id}
                          whileHover={{ scale: 1.02 }}
                          className={`border rounded-lg p-3 ${RARITY_COLORS[character.rarity as keyof typeof RARITY_COLORS]}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{character.icon}</div>
                              <div>
                                <div className="font-medium flex items-center">
                                  {character.name}
                                  {getRarityIcon(character.rarity)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {character.health} health
                                </div>
                              </div>
                            </div>
                            {owned ? (
                              <Badge variant="secondary">Owned</Badge>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => buyItem(character, 'character')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {character.price} coins
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Coin Shop Tab */}
          <TabsContent value="coinshop" className="space-y-6">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 mb-6"
              >
                <h2 className="text-3xl font-bold text-white mb-2">💰 Coin Shop</h2>
                <p className="text-green-100 text-lg">Purchase coins to accelerate your boxing journey!</p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COIN_PACKAGES.map((coinPackage, index) => (
                <motion.div
                  key={coinPackage.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  {coinPackage.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-3 py-1">
                        🔥 MOST POPULAR
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`${coinPackage.color} border-0 shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{coinPackage.icon}</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{coinPackage.name}</h3>
                        
                        <div className="bg-black/20 rounded-lg p-4 mb-4">
                          <div className="text-3xl font-bold text-white mb-1">
                            {coinPackage.coins.toLocaleString()}
                          </div>
                          {coinPackage.bonus > 0 && (
                            <div className="text-lg text-yellow-200 font-semibold">
                              +{coinPackage.bonus.toLocaleString()} Bonus!
                            </div>
                          )}
                          <div className="text-sm text-gray-200 mt-2">
                            Total: {(coinPackage.coins + coinPackage.bonus).toLocaleString()} coins
                          </div>
                        </div>
                        
                        <div className="text-4xl font-bold text-white mb-4">
                          ${coinPackage.price}
                        </div>
                        
                        <Button
                          onClick={() => buyCoinPackage(coinPackage)}
                          className="w-full bg-white text-black hover:bg-gray-100 font-bold py-3 text-lg transform hover:scale-105 transition-all duration-200"
                          size="lg"
                        >
                          <DollarSign className="w-5 h-5 mr-2" />
                          Purchase Now
                        </Button>
                        
                        {coinPackage.bonus > 0 && (
                          <p className="text-yellow-200 text-sm mt-2 font-semibold">
                            ⚡ {Math.round((coinPackage.bonus / coinPackage.coins) * 100)}% Bonus Coins!
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Card className="bg-slate-800 border-slate-600 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Wallet className="w-8 h-8 text-green-500 mr-3" />
                    <h3 className="text-xl font-bold text-white">Why Buy Coins?</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">⚔️</div>
                      <div className="text-white">
                        <div className="font-semibold">Upgrade Faster</div>
                        <div className="text-sm text-gray-300">Get the best gloves & characters instantly</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🏆</div>
                      <div className="text-white">
                        <div className="font-semibold">Dominate Opponents</div>
                        <div className="text-sm text-gray-300">Unlock powerful gear to win more fights</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">⭐</div>
                      <div className="text-white">
                        <div className="font-semibold">VIP Access</div>
                        <div className="text-sm text-gray-300">Save up for the ultimate VIP experience</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🎯</div>
                      <div className="text-white">
                        <div className="font-semibold">Skip the Grind</div>
                        <div className="text-sm text-gray-300">Jump ahead and enjoy the best content</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Equipped Items */}
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white">Currently Equipped</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{selectedCharacter.icon}</div>
                    <h3 className="text-lg font-semibold text-white">{selectedCharacter.name}</h3>
                    <p className="text-gray-300">Health: {selectedCharacter.health}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-2 ${selectedGlove.color}`}></div>
                    <h3 className="text-lg font-semibold text-white">{selectedGlove.name}</h3>
                    <p className="text-gray-300">Damage: {selectedGlove.damage}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Grid */}
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white">Your Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Gloves ({ownedGloves.length})</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {ownedGloves.map((glove) => (
                          <Button
                            key={glove.id}
                            variant={selectedGlove.id === glove.id ? "default" : "outline"}
                            onClick={() => setSelectedGlove(glove)}
                            className={`p-2 h-auto ${
                              selectedGlove.id === glove.id 
                                ? 'bg-blue-600 hover:bg-blue-700' 
                                : 'bg-slate-700 hover:bg-slate-600 border-slate-600'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded-full ${glove.color}`}></div>
                              <span className="text-xs text-white">{glove.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Characters ({ownedCharacters.length})</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {ownedCharacters.map((character) => (
                          <Button
                            key={character.id}
                            variant={selectedCharacter.id === character.id ? "default" : "outline"}
                            onClick={() => setSelectedCharacter(character)}
                            className={`p-2 h-auto ${
                              selectedCharacter.id === character.id 
                                ? 'bg-purple-600 hover:bg-purple-700' 
                                : 'bg-slate-700 hover:bg-slate-600 border-slate-600'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{character.icon}</span>
                              <span className="text-xs text-white">{character.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* VIP Tab */}
          <TabsContent value="vip" className="space-y-6">
            {!hasVIP ? (
              /* VIP Purchase Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden"
              >
                <Card className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-600 border-0 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 animate-pulse"></div>
                  <CardHeader className="relative z-10 text-center pb-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center shadow-xl"
                    >
                      <Gem className="w-12 h-12 text-yellow-800" />
                    </motion.div>
                    <CardTitle className="text-4xl font-bold text-black mb-2">
                      🏆 VIP CHAMPION PASS 🏆
                    </CardTitle>
                    <p className="text-xl text-yellow-900 font-semibold">
                      Unlock 100 Incredible Benefits!
                    </p>
                    <p className="text-yellow-800 mt-2">
                      Join the elite circle of boxing champions
                    </p>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 text-center">
                    <div className="bg-black/20 rounded-lg p-6 mb-6">
                      <div className="text-3xl font-bold text-white mb-2">
                        {VIP_PRICE.toLocaleString()} Coins
                      </div>
                      <div className="text-yellow-100">
                        30 Days of Ultimate Power
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6 text-left">
                      <div className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-bold text-white mb-2">⚔️ Combat Supremacy</h4>
                        <p className="text-yellow-100 text-sm">15 exclusive combat bonuses including 3x damage and berserker mode</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-bold text-white mb-2">💰 Economic Domination</h4>
                        <p className="text-yellow-100 text-sm">15 wealth-building features with 3x coin rewards and daily bonuses</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-bold text-white mb-2">💎 Exclusive Content</h4>
                        <p className="text-yellow-100 text-sm">15 VIP-only items including mythic gear and diamond gloves</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-bold text-white mb-2">🌟 Ultimate Powers</h4>
                        <p className="text-yellow-100 text-sm">55 supernatural abilities including time manipulation and god mode</p>
                      </div>
                    </div>

                    <Button 
                      onClick={buyVIP}
                      size="lg"
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl px-8 py-4 shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      <Crown className="w-6 h-6 mr-2" />
                      BECOME A VIP CHAMPION
                    </Button>
                    
                    <p className="text-yellow-800 mt-4 text-sm">
                      ⚡ Instant activation • 💯 100 benefits • 🔥 30-day access
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* VIP Benefits Display */
              <div className="space-y-6">
                {/* VIP Status Header */}
                <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Crown className="w-8 h-8 text-black mr-3" />
                      <h2 className="text-2xl font-bold text-black">VIP CHAMPION ACTIVE</h2>
                      <Crown className="w-8 h-8 text-black ml-3" />
                    </div>
                    <p className="text-yellow-900 text-lg font-semibold">
                      {getVIPTimeLeft()} • 100 Benefits Unlocked
                    </p>
                  </CardContent>
                </Card>

                {/* Category Filter */}
                <Card className="bg-slate-800 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedBenefitCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedBenefitCategory(category)}
                          className={selectedBenefitCategory === category 
                            ? 'bg-yellow-600 hover:bg-yellow-700' 
                            : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white'
                          }
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBenefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">{benefit.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-white text-sm">{benefit.name}</h4>
                                <Check className="w-4 h-4 text-green-500" />
                              </div>
                              <p className="text-gray-300 text-xs mb-2">{benefit.description}</p>
                              <Badge 
                                variant="outline" 
                                className="text-xs border-yellow-500 text-yellow-400"
                              >
                                {benefit.category}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App