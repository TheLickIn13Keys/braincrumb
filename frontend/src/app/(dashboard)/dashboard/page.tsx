"use client"

import { useState } from 'react'
import { Bell, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { CourseCard } from "@/src/components/dashboard/course-card"
import { RecommendationCard } from "@/src/components/dashboard/recommendation-card"
import { ActivityItem } from "@/src/components/dashboard/activity-item"
import { ProgressChart } from "@/src/components/dashboard/progress-chart"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('ongoing')

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CourseCard
              title="Biology"
              subtitle="Biology Basics: Evolution"
              image="/api/placeholder/400/320"
              progress={65}
            />
            <CourseCard
              title="Chemistry"
              subtitle="Chemistry 101: Reactions"
              image="/api/placeholder/400/320"
              progress={100}
            />
            <CourseCard
              title="Math"
              subtitle="Calculus: Derivatives"
              image="/api/placeholder/400/320"
              progress={30}
            />
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          {/* Upcoming courses content */}
        </TabsContent>
        <TabsContent value="archive">
          {/* Archived courses content */}
        </TabsContent>
      </Tabs>

      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Personalized Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <RecommendationCard
            title="Calculus Deep Dive"
            description="Explore advanced calculus theories with this insightful video."
            image="/api/placeholder/400/320"
          />
          <RecommendationCard
            title="History Quiz Challenge"
            description="Test your knowledge on major world history events with this engaging quiz."
            image="/api/placeholder/400/320"
          />
          <RecommendationCard
            title="Climate Change Doc"
            description="Understand the current climate crisis with this informative documentary."
            image="/api/placeholder/400/320"
          />
          <RecommendationCard
            title="AI Ethics"
            description="Explore the ethical implications of artificial intelligence in this thought-provoking course."
            image="/api/placeholder/400/320"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <ActivityItem
                title="Completed Quiz"
                description="You scored 85% in Calculus Quiz 2."
                time="2 hours ago"
                image="/api/placeholder/48/48"
              />
              <ActivityItem
                title="Module Finished"
                description="Completed the 'Introduction to Python' module."
                time="Yesterday"
                image="/api/placeholder/48/48"
              />
              <ActivityItem
                title="Video Watched"
                description="Watched 'Advanced Algebra Techniques' video."
                time="2 days ago"
                image="/api/placeholder/48/48"
              />
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}